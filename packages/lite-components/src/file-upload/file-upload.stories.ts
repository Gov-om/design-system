import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupFileUploadClasses } from './file-upload';
/* eslint-disable import/no-unresolved */
import { gupFormClasses } from '../forms';
import './file-upload.css';
import '../forms.css';
/* eslint-enable import/no-unresolved */

type Story = StoryObj;

const UPLOAD_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" class="gup-file-upload__trigger-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">' +
  '<path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>' +
  '</svg>';

const ERROR_ICON_PATH = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${ERROR_ICON_PATH}"/></svg>`;

export default {
  title: 'Lite Components - WIP/Forms/File upload',
  tags: ['autodocs', 'BETA'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based File Upload

An alternative to the \`<gup-file-upload>\` web component for projects that prefer native HTML elements.

**This is the one lite form component that requires JavaScript.** A styled list of the
selected files with a per-file Remove button cannot be built with HTML and CSS alone -
every other lite form component is HTML + CSS only. The behaviour is provided as
self-contained vanilla JavaScript that you can copy into your page verbatim (no npm
install, no build step, no custom elements), the same pattern as the managed-stepper
template. Use \`GupFileUpload.init(container)\` to wire up a container element.

The native \`<input type="file">\` is kept as the single source of truth: chosen files are
written back to it with a \`DataTransfer\`, so the files shown in the list are exactly the
files a normal HTML form submission sends. \`getFiles()\` remains available as a convenience
but is not required for submission.

### Usage

\`\`\`html
<div class="gup-file-upload" id="my-upload">
  <label class="gup-file-upload__label" for="my-input">Upload a file</label>
  <!-- optional hint (requires forms.css) -->
  <span class="gup-form-hint">Only .pdf or .jpg files at 5 MB or less.</span>
  <!-- optional error - add gup-file-upload--error to the outer div -->
  <span class="gup-form-error" role="alert" style="display:none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    Error message here.
  </span>
  <div class="gup-file-upload__input-wrapper">
    <span class="gup-file-upload__trigger">
      <svg class="gup-file-upload__trigger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
      </svg>
      <span class="gup-file-upload__trigger-label">Choose file</span>
    </span>
    <input class="gup-file-upload__input" id="my-input" type="file" name="upload">
  </div>
  <ul class="gup-file-upload__file-list"></ul>
</div>
\`\`\`

\`\`\`typescript
import { GupFileUpload } from '@govom/lite-components';

GupFileUpload.init(document.getElementById('my-upload'));
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-file-upload\` | Base class on the outer \`<div>\` (required) |
| \`.gup-file-upload--error\` | Error state - changes border and trigger colour |
| \`.gup-file-upload__label\` | The \`<label>\` element |
| \`.gup-file-upload__input-wrapper\` | Bordered button wrapper, holds trigger and native input |
| \`.gup-file-upload__trigger\` | Visible styled content inside the button (pointer-events: none) |
| \`.gup-file-upload__trigger-icon\` | Upload icon SVG inside the trigger |
| \`.gup-file-upload__trigger-label\` | "Choose file" label text inside the trigger |
| \`.gup-file-upload__input\` | Native \`<input type="file">\` (absolutely positioned, transparent) |
| \`.gup-file-upload__file-list\` | \`<ul>\` that holds uploaded file items (rendered by JS) |
| \`.gup-form-hint\` | Hint text (from \`forms.css\`) |
| \`.gup-form-error\` | Error message with icon (from \`forms.css\`) |
        `,
      },
    },
  },
} as Meta;

/**
 * Single-file upload. Once a file is selected, the upload button hides and only the file
 * entry with a remove button is shown.
 */
export const Default: Story = {
  render: () => html`
    <div class="${gupFileUploadClasses.base}" id="fu-default">
      <label class="${gupFileUploadClasses.label}" for="fu-default-input">Upload a file</label>
      <div class="${gupFileUploadClasses.inputWrapper}">
        <span class="${gupFileUploadClasses.trigger}">
          ${unsafeHTML(UPLOAD_ICON_SVG)}
          <span class="${gupFileUploadClasses.triggerLabel}">Choose file</span>
        </span>
        <input class="${gupFileUploadClasses.input}" id="fu-default-input" type="file" name="upload">
      </div>
      <ul class="${gupFileUploadClasses.fileList}"></ul>
    </div>
    <script>
      (function () {
        const el = document.getElementById('fu-default');
        if (!el || !window.GupFileUpload) return;
        window.GupFileUpload.init(el);
      })();
    </script>
  `,
};

/**
 * Multiple files can be selected. The upload button remains visible so the user
 * can keep adding files.
 */
export const Multiple: Story = {
  render: () => html`
    <div class="${gupFileUploadClasses.base}" id="fu-multiple">
      <label class="${gupFileUploadClasses.label}" for="fu-multiple-input">Upload files</label>
      <div class="${gupFileUploadClasses.inputWrapper}">
        <span class="${gupFileUploadClasses.trigger}">
          ${unsafeHTML(UPLOAD_ICON_SVG)}
          <span class="${gupFileUploadClasses.triggerLabel}">Choose files</span>
        </span>
        <input class="${gupFileUploadClasses.input}" id="fu-multiple-input" type="file" name="upload" multiple>
      </div>
      <ul class="${gupFileUploadClasses.fileList}"></ul>
    </div>
    <script>
      (function () {
        const el = document.getElementById('fu-multiple');
        if (!el || !window.GupFileUpload) return;
        window.GupFileUpload.init(el);
      })();
    </script>
  `,
};

/**
 * With a hint below the label describing accepted file types or size limits.
 */
export const WithHint: Story = {
  render: () => html`
    <div class="${gupFileUploadClasses.base}" id="fu-hint">
      <label class="${gupFileUploadClasses.label}" for="fu-hint-input">Upload a file</label>
      <span class="${gupFormClasses.hint}">Only .pdf, .jpg or .png files at 5 MB or less.</span>
      <div class="${gupFileUploadClasses.inputWrapper}">
        <span class="${gupFileUploadClasses.trigger}">
          ${unsafeHTML(UPLOAD_ICON_SVG)}
          <span class="${gupFileUploadClasses.triggerLabel}">Choose file</span>
        </span>
        <input class="${gupFileUploadClasses.input}" id="fu-hint-input" type="file" name="upload">
      </div>
      <ul class="${gupFileUploadClasses.fileList}"></ul>
    </div>
    <script>
      (function () {
        const el = document.getElementById('fu-hint');
        if (!el || !window.GupFileUpload) return;
        window.GupFileUpload.init(el);
      })();
    </script>
  `,
};

/**
 * Error state - add \`gup-file-upload--error\` to the container and show a
 * \`gup-form-error\` element to communicate the validation failure.
 */
export const WithError: Story = {
  render: () => html`
    <div class="${gupFileUploadClasses.base} ${gupFileUploadClasses.hasError}" id="fu-error">
      <label class="${gupFileUploadClasses.label}" for="fu-error-input">Upload a file</label>
      <span class="${gupFormClasses.error}" role="alert">
        ${unsafeHTML(errorIcon)}
        A file is required.
      </span>
      <div class="${gupFileUploadClasses.inputWrapper}">
        <span class="${gupFileUploadClasses.trigger}">
          ${unsafeHTML(UPLOAD_ICON_SVG)}
          <span class="${gupFileUploadClasses.triggerLabel}">Choose file</span>
        </span>
        <input class="${gupFileUploadClasses.input}" id="fu-error-input" type="file" name="upload">
      </div>
      <ul class="${gupFileUploadClasses.fileList}"></ul>
    </div>
    <script>
      (function () {
        const el = document.getElementById('fu-error');
        if (!el || !window.GupFileUpload) return;
        window.GupFileUpload.init(el);
      })();
    </script>
  `,
};

export const RTL: Story = {
  render: () => html`
    <div class="${gupFileUploadClasses.base}" id="fu-rtl" dir="rtl">
      <label class="${gupFileUploadClasses.label}" for="fu-rtl-input">رفع ملف</label>
      <span class="${gupFormClasses.hint}">يُرجى اختيار ملف بصيغة PDF أو JPG بحجم لا يتجاوز 5 ميغابايت.</span>
      <div class="${gupFileUploadClasses.inputWrapper}">
        <span class="${gupFileUploadClasses.trigger}">
          ${unsafeHTML(UPLOAD_ICON_SVG)}
          <span class="${gupFileUploadClasses.triggerLabel}">اختر ملفاً</span>
        </span>
        <input class="${gupFileUploadClasses.input}" id="fu-rtl-input" type="file" name="upload">
      </div>
      <ul class="${gupFileUploadClasses.fileList}"></ul>
    </div>
    <script>
      (function () {
        const el = document.getElementById('fu-rtl');
        if (!el || !window.GupFileUpload) return;
        window.GupFileUpload.init(el);
      })();
    </script>
  `,
  parameters: {
    direction: 'rtl',
  },
};
