import { html, nothing, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './file-upload.css?inline';
import { getAriaDescribedBy, isEmpty } from '../../utils/helpers';
import { EventDispatcher, event } from '../../utils/decorators/event';
import { HasSlotController } from '../../utils/slot-controller';
import { watch } from '../../utils/decorators/watch';
import '../icon/icon';
import '../button/button';
import '../form-hint/form-hint';
import '../form-validation-message/form-validation-message';
import '../file-item/file-item';
import { innerInputValidators } from '../../utils/form-validators';
import { FormControlMixin, requiredValidator } from '@open-wc/form-control';

/**
 * A file upload component that allows users to upload files
 *
 * @event gup-change - Event dispatched when the value of the input changes
 * @event gup-delete - Event dispatched when a file is deleted
 * @event gup-invalid - Emitted on error, contains validity state
 *
 * @slot - Text or any custom HTML to render in the label
 * @slot hint - Optional text that appears below the field if provided, used to guide the user about the input requirements or expected format
 * @slot extra-action - Optional extra action button next to the upload button
 *
 * @dependency gup-icon
 * @dependency gup-button
 * @dependency gup-track
 * @dependency gup-form-hint
 * @dependency gup-form-validation-message
 * @dependency gup-file-item
 */
@customElement('gup-file-upload')
export class FileUpload extends FormControlMixin(GupComponent) {
  static readonly formControlValidators = [...innerInputValidators, requiredValidator];
  /** Name of input element – gets submitted with the form data */
  @property() name = '';

  /** The label seen on the upload button */
  @property({ attribute: 'file-input-label' }) fileInputLabel = 'Choose file';

  /** The label seen on the delete file button */
  @property({ attribute: 'item-delete-label' }) itemDeleteLabel = 'Remove the file';

  /** The file types that the input should accept. Written as a comma-separated list of MIME types */
  @property() accept = '';

  /** If set to true, the user can select multiple files */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /** If the input is required */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Whether or not should the input take up the full width of its parent container. Defaults to fit content */
  @property({ attribute: 'full-width', type: Boolean, reflect: true }) isFullWidth = false;

  /** Display an error message and apply invalid input styles */
  @property({ attribute: 'error-message' }) errorMessage? = '';

  /** Whether to generate thumbnails for images */
  @property({ type: Boolean, attribute: 'allow-thumbnails' }) allowThumbnails = false;

  /** Display an error message for size validation */
  @property({ attribute: 'size-validation-message' }) sizeValidationMessage? = 'Maximum file size exceeded!';

  /** The maximum file size to be uploaded in MB*/
  @property({ type: Number, attribute: 'max-file-size' }) maxFileSize = 50;

  /** Event dispatched when the value of the input changes */
  @event('gup-change') private onChange!: EventDispatcher<FileUploadFileType[] | null>;

  /** Event dispatched when a file is deleted */
  @event('gup-delete') private onDelete!: EventDispatcher<File | null>;

  @event('gup-invalid') private onInvalid!: EventDispatcher<ValidityState>;

  // Note this property must not be renamed (it is used by the form control mixin)
  /** @internal */
  @query('#native-input') validationTarget!: HTMLInputElement;

  private readonly hasSlotController = new HasSlotController(this, 'hint');

  @state() private _uploadedFiles: FileUploadFileType[] = [];

  @state() private _showError: boolean = false;

  /**
   * Sets or gets the files to display with rich attributes such as thumbnails
   *
   * @param {{ file: File; thumbnail?: { src: string; alt: string; } | null; }[]} value - Array of files to accept (when setter) or return (when getter)
   */
  @property({ type: Array }) set uploadedFiles(value: FileUploadFileType[]) {
    this._uploadedFiles = value;
  }

  public get uploadedFiles(): FileUploadFileType[] {
    return this._uploadedFiles;
  }

  private _value!: File[];

  /**
   * Sets or gets the files to display
   *
   * @param {File[]} value - Array of files to accept (when setter) or return (when getter)
   */
  public set value(value: File[]) {
    this._value = value;

    const formData = this.getNativeFormValue(value);
    this.setValue(formData);

    if (formData) {
      this.uploadedFiles = formData.getAll(this.name).map((file) => {
        return {
          file: file as File,
        };
      });
    }
  }

  public get value(): File[] | null {
    return this._value && this._value.length > 0 ? this._value : this.convertUploadedFilesToValue();
  }

  @watch('_uploadedFiles')
  async handleFilesChange(): Promise<void> {
    this.setValue(this.getNativeFormValue());

    await this.validationComplete;

    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.internals.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  private convertBytesToMB(bytes: number): string {
    const BYTES_TO_MB = 1024 * 1024;
    const BYTES_TO_KB = 1024;

    if (bytes >= BYTES_TO_MB) {
      const megabytes = bytes / BYTES_TO_MB;
      return `${megabytes.toFixed(2)} MB`;
    } else {
      const kilobytes = bytes / BYTES_TO_KB;
      return `${kilobytes.toFixed(2)} KB`;
    }
  }

  // Returns the value of the input in a FormData object whether it is set via value property (native, doesn't support extra attributes) or with uploadedFiles property (non-native, supports extra attributes such as thumbnails)
  private getNativeFormValue(files: File[] | null = null): FormData | null {
    const formData = new FormData();

    if (files) {
      files.forEach((file) => {
        formData.append(this.name, file);
      });
    } else {
      this._uploadedFiles.forEach((file) => {
        formData.append(this.name, file.file);
      });
    }

    return formData.entries().next().done ? null : formData;
  }

  private convertUploadedFilesToValue(): File[] | null {
    return (
      this._uploadedFiles.map((file) => {
        return file.file;
      }) || null
    );
  }

  firstUpdated() {
    this.setValue(this.getNativeFormValue());
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('isFullWidth')) {
      this.style.setProperty('--file-input-width', this.isFullWidth ? '100%' : 'fit-content');
    }
  }

  reportValidity() {
    this.requestUpdate();
    return this.checkValidity();
  }

  validityCallback(): string | void {
    this.onInvalid(this.internals.validity);
    return this.errorMessage || this.validationTarget?.validationMessage;
  }

  public setCustomValidity(message: string): void {
    this.validationTarget?.setCustomValidity(message);
    this.requestUpdate();
  }

  /* valueChangedCallback(value: FormData): void {
    // Using this callback breaks thumbnails as it triggers on component load too
    if (value) {
      this.uploadedFiles = value.getAll(this.name).map((file) => {
        return {
          file: file as File,
        };
      });
    }
  } */

  async forceCustomError() {
    await this.updateComplete;
    this.validationTarget.setCustomValidity(this.errorMessage || 'An error occurred');
    this.setValue(this.getNativeFormValue());
    this.reportValidity();
  }

  async forceCustomSizeValidationError() {
    await this.updateComplete;
    this._showError = true;
    this.validationTarget.setCustomValidity(this.sizeValidationMessage || 'An error occurred');
    this.setValue(this.getNativeFormValue());
    this.reportValidity();
  }

  async clearCustomError() {
    await this.updateComplete;
    this._showError = false;
    this.validationTarget.setCustomValidity('');
    this.setValue(this.getNativeFormValue());
    this.reportValidity();
  }

  private handleFileChange = () => {
    const files = this.validationTarget.files;

    if (!files || !files.length) {
      return;
    }

    const filesArray: FileUploadFileType[] = [];

    Array.from(files).forEach((file) => {
      //checks the file size
      if (this.maxFileSize > 0 && file.size > this.maxFileSize * 1024 * 1024) {
        this.forceCustomSizeValidationError();
        return;
      }

      const reader = new FileReader();

      const fileType = file.type.split('/')[0];

      reader.onload = (event) => {
        let thumbnail = null;
        if (this.allowThumbnails && fileType === 'image') {
          const result = event.target?.result as string;

          thumbnail = { src: result, alt: file.name };
        }

        filesArray.push({
          file,
          thumbnail,
        });

        if (filesArray.length === files.length) {
          this.clearCustomError();
          this.uploadedFiles = [...this.uploadedFiles, ...filesArray];
          this.onChange(this.uploadedFiles);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  private deleteFile = (file: File) => {
    if (!this._uploadedFiles) {
      return;
    }
    const uploadedFiles = this._uploadedFiles.filter((f: FileUploadFileType) => f.file.name !== file.name);
    this._uploadedFiles = uploadedFiles;

    const newValue = uploadedFiles.map((f: FileUploadFileType) => f.file);
    this.updateValue(newValue);
    this.onDelete(file);
    this.onChange(this._uploadedFiles);
  };

  private updateValue(newValue: File[]) {
    this._value = newValue;
    const formData = this.getNativeFormValue(newValue);
    this.setValue(formData);
  }

  private renderLabel() {
    return html`
      <label for="native-input" class="${classMap({ 'label': true, 'has-error': !isEmpty(this.errorMessage) })}">
        <div>
          <slot></slot>
        </div>
      </label>
    `;
  }

  private renderValidationErrorMessage() {
    return this._showError && !isEmpty(this.sizeValidationMessage)
      ? html`
        <gup-form-validation-message class="error-message" id="error-message">
          ${this.sizeValidationMessage}
        </gup-form-validation-message>`
      : nothing;
  }

  private renderErrorMessage() {
    return !isEmpty(this.errorMessage)
      ? html`
        <gup-form-validation-message class="error-message" id="error-message">
          ${this.errorMessage}
        </gup-form-validation-message>`
      : nothing;
  }

  private renderHint() {
    return this.hasSlotController.test('hint') ? html`<gup-form-hint class="hint" id="hint"><slot name="hint"></slot></gup-form-hint>` : '';
  }

  private renderUploadedFiles() {
    if (this.uploadedFiles.length === 0) {
      return nothing;
    }

    return html`
      <div class="uploaded-files">
        ${this.uploadedFiles.map(
          (item) => html`
            <gup-file-item
              file-name="${item.file.name}"
              subtitle="${new Date(item.file.lastModified).toLocaleDateString() + ', ' + this.convertBytesToMB(item.file.size)}"
              thumbnail-src="${(this.allowThumbnails && item.thumbnail?.src) || ''}"
              thumbnail-alt="${(this.allowThumbnails && item.thumbnail?.alt) || ''}"
            >
              <gup-button @gup-click="${() => this.deleteFile(item.file)}" with-icon-only label="${this.itemDeleteLabel}" appearance="text">
                <gup-icon icon-name="delete-forever" height="24" width="24" class="delete-icon"></gup-icon>
              </gup-button>
            </gup-file-item>
        `
        )}
      </div>
    `;
  }

  private renderFileInput() {
    return html`
      <gup-track gap="3" class="actions">
        <div class="input-wrapper">
          <span class="file-input">
            <gup-icon icon-name="upload" height="20" width="20" class="file-input-icon"></gup-icon>
            <span class="file-input-button">${this.fileInputLabel}</span>
          </span>
          <input id="native-input" type="file" class="native-input" accept="${this.accept}" ?multiple="${this.multiple}" ?required="${this.required}" name="${this.name}" @change="${this.handleFileChange}" aria-describedby=${getAriaDescribedBy(this.hasSlotController.test('hint'), !!this.errorMessage)}>
        </div>
        <slot name="extra-action"></slot>
      </gup-track>
    `;
  }

  render() {
    return html`
      ${this.renderLabel()}
      ${this.renderHint()}
      ${this.renderErrorMessage()}
      ${this.renderValidationErrorMessage()}
      ${(!this.multiple && this.uploadedFiles.length === 0) || this.multiple ? this.renderFileInput() : ''}
      ${this.renderUploadedFiles()}
    `;
  }

  static readonly styles = unsafeCSS(styles);
}

export type FileUploadFileType = {
  file: File;
  thumbnail?: {
    src: string;
    alt: string;
  } | null;
};
