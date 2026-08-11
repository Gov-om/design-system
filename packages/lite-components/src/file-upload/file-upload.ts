/**
 * GUP File Upload - Class-based approach
 *
 * The one lite form component that requires JavaScript: a styled list of the
 * selected files with a per-file Remove button cannot be built with HTML and CSS
 * alone. Self-contained (no build step, no custom elements) so it can be copied
 * into low-code or hand-written pages, like the managed-stepper template.
 * Use GupFileUpload.init() to wire up a container.
 *
 * The native <input> is kept as the single source of truth (files are written
 * back to it with a DataTransfer), so the files shown are the files a normal
 * form submission sends.
 *
 * @example
 * // HTML structure
 * <div class="gup-file-upload" id="my-upload">
 *   <label class="gup-file-upload__label" for="my-input">Upload a file</label>
 *   <div class="gup-file-upload__input-wrapper">
 *     <span class="gup-file-upload__trigger">
 *       <svg class="gup-file-upload__trigger-icon" ...>...</svg>
 *       <span class="gup-file-upload__trigger-label">Choose file</span>
 *     </span>
 *     <input class="gup-file-upload__input" id="my-input" type="file" name="upload">
 *   </div>
 *   <ul class="gup-file-upload__file-list"></ul>
 * </div>
 *
 * @example
 * // Initialise with JavaScript
 * import { GupFileUpload } from '@govom/lite-components';
 * GupFileUpload.init(document.getElementById('my-upload'));
 */

export const gupFileUploadBaseClass = 'gup-file-upload';

export const gupFileUploadClasses = {
  base: gupFileUploadBaseClass,
  /** The <label> element */
  label: `${gupFileUploadBaseClass}__label`,
  /** Wrapper that positions the trigger and the native input on top of each other */
  inputWrapper: `${gupFileUploadBaseClass}__input-wrapper`,
  /** Visible styled button (pointer-events: none, decorative) */
  trigger: `${gupFileUploadBaseClass}__trigger`,
  /** Upload icon inside the trigger */
  triggerIcon: `${gupFileUploadBaseClass}__trigger-icon`,
  /** "Choose file" label text inside the trigger */
  triggerLabel: `${gupFileUploadBaseClass}__trigger-label`,
  /** The native <input type="file"> (absolutely positioned, transparent) */
  input: `${gupFileUploadBaseClass}__input`,
  /** <ul> list of uploaded file items */
  fileList: `${gupFileUploadBaseClass}__file-list`,
  /** <li> for each uploaded file */
  fileItem: `${gupFileUploadBaseClass}__file-item`,
  /** Metadata container (name + subtitle) */
  fileMeta: `${gupFileUploadBaseClass}__file-meta`,
  /** File name text */
  fileName: `${gupFileUploadBaseClass}__file-name`,
  /** File date + size text */
  fileSubtitle: `${gupFileUploadBaseClass}__file-subtitle`,
  /** Remove-file button */
  fileDelete: `${gupFileUploadBaseClass}__file-delete`,
  /** Add to the base element to show the error state */
  hasError: `${gupFileUploadBaseClass}--error`,
  /** Off-screen polite live region for add/remove announcements */
  status: `${gupFileUploadBaseClass}__status`,
} as const;

const DELETE_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">' +
  '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z' +
  'm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12z' +
  'M15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>';

/**
 * Manages the interactive behaviour of a `.gup-file-upload` container:
 * handles file selection, renders the file list, and wires up delete buttons.
 */
// DataTransfer is the only way to build a FileList to assign to input.files.
function toFileList(files: File[]): FileList {
  const dt = new DataTransfer();
  files.forEach((f) => dt.items.add(f));
  return dt.files;
}

export class GupFileUpload {
  private input: HTMLInputElement;
  private fileList: HTMLUListElement;
  private inputWrapper: HTMLElement;
  private status: HTMLElement;
  private selected: File[] = [];

  constructor(container: HTMLElement) {
    const input = container.querySelector<HTMLInputElement>(`.${gupFileUploadClasses.input}`);
    const fileList = container.querySelector<HTMLUListElement>(`.${gupFileUploadClasses.fileList}`);
    const inputWrapper = container.querySelector<HTMLElement>(`.${gupFileUploadClasses.inputWrapper}`);

    if (!input || !fileList || !inputWrapper) {
      throw new Error('GupFileUpload: required child elements not found in container');
    }

    this.input = input;
    this.fileList = fileList;
    this.inputWrapper = inputWrapper;
    this.status = this.createStatusRegion(container);

    this.input.addEventListener('change', () => this.handleChange());
  }

  static init(container: HTMLElement): GupFileUpload {
    return new GupFileUpload(container);
  }

  // A polite live region announces add/remove without moving focus.
  private createStatusRegion(container: HTMLElement): HTMLElement {
    let region = container.querySelector<HTMLElement>(`.${gupFileUploadClasses.status}`);
    if (!region) {
      region = document.createElement('div');
      region.className = `${gupFileUploadClasses.status} visually-hidden`;
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      container.appendChild(region);
    }
    return region;
  }

  private announce(message: string): void {
    if (!this.status) return;
    // Clear first so an identical consecutive message is still announced.
    this.status.textContent = '';
    window.setTimeout(() => {
      this.status.textContent = message;
    }, 50);
  }

  private currentFiles(): File[] {
    return Array.from(this.input.files ?? []);
  }

  private handleChange(): void {
    const picked = this.currentFiles();
    if (!picked.length) return;

    // Native input replaces its list each dialog; accumulate across selections.
    const merged = this.input.multiple ? [...this.selected] : [];
    const added: string[] = [];
    picked.forEach((file) => {
      if (!merged.some((f) => f.name === file.name)) {
        merged.push(file);
        added.push(file.name);
      }
    });

    // Write files back to the input so a normal form submit includes them.
    this.selected = merged;
    this.input.files = toFileList(merged);
    this.render();

    if (added.length === 1) this.announce(`${added[0]} added.`);
    else if (added.length > 1) this.announce(`${added.length} files added.`);
  }

  private deleteFile(fileName: string, removedIndex: number): void {
    const remaining = this.currentFiles().filter((f) => f.name !== fileName);
    this.selected = remaining;
    this.input.files = toFileList(remaining);
    this.render();
    this.announce(`${fileName} removed.`);
    this.moveFocusAfterRemoval(removedIndex);
  }

  // Move focus to the next remaining button, else the input - never <body>.
  private moveFocusAfterRemoval(removedIndex: number): void {
    const buttons = this.fileList.querySelectorAll<HTMLButtonElement>(`.${gupFileUploadClasses.fileDelete}`);
    if (buttons.length) {
      buttons[Math.min(removedIndex, buttons.length - 1)].focus();
    } else {
      this.input.focus();
    }
  }

  private render(): void {
    this.fileList.innerHTML = '';
    this.currentFiles().forEach((file, index) => {
      const li = document.createElement('li');
      li.className = gupFileUploadClasses.fileItem;

      const meta = document.createElement('div');
      meta.className = gupFileUploadClasses.fileMeta;

      const name = document.createElement('span');
      name.className = gupFileUploadClasses.fileName;
      name.textContent = file.name;

      const subtitle = document.createElement('span');
      subtitle.className = gupFileUploadClasses.fileSubtitle;
      subtitle.textContent = `${new Date(file.lastModified).toLocaleDateString()}, ${this.formatSize(file.size)}`;

      meta.append(name, subtitle);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = gupFileUploadClasses.fileDelete;
      btn.setAttribute('aria-label', `Remove ${file.name}`);
      btn.innerHTML = DELETE_ICON_SVG;
      btn.addEventListener('click', () => this.deleteFile(file.name, index));

      li.append(meta, btn);
      this.fileList.append(li);
    });

    if (!this.input.multiple) {
      this.inputWrapper.style.display = this.currentFiles().length > 0 ? 'none' : '';
    }
  }

  private formatSize(bytes: number): string {
    if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  // Convenience only; the native input already holds the files for submission.
  getFiles(): File[] {
    return this.currentFiles();
  }
}

export default GupFileUpload;
