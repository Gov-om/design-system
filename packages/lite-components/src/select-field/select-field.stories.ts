import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupSelectFieldClasses, type GupSelectFieldOptions } from './select-field';
/* eslint-disable import/no-unresolved */
import { gupFormClasses } from '../forms';
import './select-field.css';
import '../forms.css';
/* eslint-enable import/no-unresolved */
import '../button/button.css';
import '../../../components/src/components/dropdown/dropdown-field/dropdown-field';
import '../../../components/src/components/dropdown/dropdown-menu/dropdown-menu';
import '../../../components/src/components/dropdown/dropdown-menu-item/dropdown-menu-item';

interface SelectFieldStoryArgs extends GupSelectFieldOptions {
  label: string;
  hint: string;
  error: string;
}

type Story = StoryObj<SelectFieldStoryArgs>;

const ERROR_ICON_PATH = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${ERROR_ICON_PATH}"/></svg>`;

const ARROW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;

/** Shared template */
const field = (id: string, args: SelectFieldStoryArgs, selectedValue = '') => html`
  <div class="${gupSelectFieldClasses.base} ${args.error ? gupSelectFieldClasses.hasError : ''}">
    <label class="${gupSelectFieldClasses.label}" for="${id}">${args.label}</label>
    ${args.hint ? html`<span class="${gupFormClasses.hint}">${args.hint}</span>` : ''}
    ${args.error ? html`<span class="${gupFormClasses.error}" role="alert">${unsafeHTML(errorIcon)}${args.error}</span>` : ''}
    <div class="${gupSelectFieldClasses.wrapper}">
      <select
        class="${gupSelectFieldClasses.select}"
        id="${id}"
        name="${args.name || id}"
        ?disabled=${args.disabled}
        ?required=${args.required}
      >
        <option value="" disabled ?selected=${!selectedValue}>Select an item</option>
        <option value="item1" ?selected=${selectedValue === 'item1'}>Item number 1</option>
        <option value="item2" ?selected=${selectedValue === 'item2'}>Item number 2, with a long label that wraps</option>
        <option value="item3" ?selected=${selectedValue === 'item3'}>Item 3</option>
        <option value="item4" ?selected=${selectedValue === 'item4'}>Item number 4</option>
        <option value="item5" ?selected=${selectedValue === 'item5'}>Item number 5</option>
        <option value="item6" disabled>Item number 6 (disabled)</option>
      </select>
      <span class="${gupSelectFieldClasses.icon}" aria-hidden="true">${unsafeHTML(ARROW_ICON)}</span>
    </div>
  </div>
`;

export default {
  title: 'Lite Components - WIP/Forms/Select field',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    hint: { control: 'text', description: 'Optional hint text shown below the label' },
    error: { control: 'text', description: 'Error message - also enables the error state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    required: { control: 'boolean', description: 'Required field' },
    name: { control: 'text', description: 'Native name attribute for form submission' },
  },
  args: {
    label: 'Label',
    hint: '',
    error: '',
    disabled: false,
    required: false,
    name: 'select',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Select Field

A styled native \`<select>\` element - use this when collecting a **single value as part of a form**.

### When to use

- The user is choosing **one option from a list** and the result will be **submitted with a form** (e.g. country, nationality, document type, service category).
- You need **built-in browser form validation** (required, disabled states work without JavaScript).
- You want the **simplest possible implementation** with no JavaScript.

### When NOT to use

- You need a list of **links or action buttons** (navigate to a page, trigger an action, open a modal) - use the [\`gup-dropdown-menu\`](?path=/docs/components-forms-dropdown-dropdown-menu--documentation) web component instead - a Lite Dropdown is not part of this release.
- You need **multiple selection** - the native \`<select multiple>\` has a different and less polished UI; consider checkboxes.
- You need **search/filter** inside the list - use the \`<gup-dropdown-field>\` web component.

### Use case examples

| Scenario | Use this? |
|---|---|
| "Select your nationality" in a form | Yes |
| "Select document type" before uploading | Yes |
| "Filter table by status" (form submit) | Yes |
| "Actions" menu on a table row (Edit, Delete) | No - use Dropdown |
| "More options" button in a header | No - use Dropdown |
| Language switcher in a nav | No - use Dropdown |

---

An alternative to the \`<gup-dropdown-field>\` web component for projects that prefer native HTML.
The trigger area is identical to \`gup-input-field\`; the native browser handles the options list.

**Excluded from this lite version (compared to the web component):**
- Multiple selection (native \`<select multiple>\` has a different UI paradigm)
- Search/filter inside the menu
- Loading state

### Usage

\`\`\`html
<div class="gup-select-field">
  <label class="gup-select-field__label" for="country">Country</label>
  <!-- optional hint (requires forms.css) -->
  <span class="gup-form-hint">Choose your country of residence.</span>
  <!-- optional error - add gup-select-field--error to the outer div when invalid -->
  <span class="gup-form-error" role="alert">
    <svg ...>...</svg>
    Please select a country.
  </span>
  <div class="gup-select-field__wrapper">
    <select class="gup-select-field__select" id="country" name="country" required>
      <option value="" disabled selected>Select a country</option>
      <option value="om">Oman</option>
      <option value="ae">UAE</option>
    </select>
    <span class="gup-select-field__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    </span>
  </div>
</div>
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-select-field\` | Base class on the outer \`<div>\` (required) |
| \`.gup-select-field--error\` | Error state - changes border and label colour |
| \`.gup-select-field__label\` | The \`<label>\` element |
| \`.gup-select-field__wrapper\` | Wrapper holding the select and icon |
| \`.gup-select-field__select\` | The \`<select>\` element |
| \`.gup-select-field__icon\` | Decorative arrow icon (\`aria-hidden\`) |
| \`.gup-form-hint\` | Hint text (from \`forms.css\`) |
| \`.gup-form-error\` | Error message with icon (from \`forms.css\`) |
        `,
      },
    },
  },
} as Meta<SelectFieldStoryArgs>;

export const Default: Story = {
  render: (args) => field('sf-default', args),
};

export const WithSelectedValue: Story = {
  render: (args) => field('sf-selected', args, 'item2'),
};

export const WithHint: Story = {
  render: (args) => field('sf-hint', args),
  args: { hint: 'Choose the option that best describes your situation.' },
};

export const WithError: Story = {
  render: (args) => field('sf-error', args),
  args: { error: 'Please select an item.' },
};

export const WithHintAndError: Story = {
  render: (args) => field('sf-hint-error', args),
  args: {
    hint: 'Choose the option that best describes your situation.',
    error: 'Please select an item.',
  },
};

export const Disabled: Story = {
  render: (args) => field('sf-disabled', args),
  args: { disabled: true },
};

export const DisabledWithValue: Story = {
  render: (args) => field('sf-disabled-value', args, 'item1'),
  args: { disabled: true },
};

/**
 * Validates on change and on form submit. Shows an inline error when no option is selected.
 */
export const Required: Story = {
  render: () => html`
    <form id="sf-req-form" novalidate>
      <div class="${gupSelectFieldClasses.base}" id="sf-req-wrap">
        <label class="${gupSelectFieldClasses.label}" for="sf-req">Nationality</label>
        <span class="${gupFormClasses.hint}">Select the country on your ID document.</span>
        <span class="${gupFormClasses.error}" id="sf-req-err" role="alert" style="display:none">
          ${unsafeHTML(errorIcon)}
          <span>Please select a nationality.</span>
        </span>
        <div class="${gupSelectFieldClasses.wrapper}">
          <select class="${gupSelectFieldClasses.select}" id="sf-req" name="nationality" required>
            <option value="" disabled selected>Select a nationality</option>
            <option value="om">Omani</option>
            <option value="ae">Emirati</option>
            <option value="kw">Kuwaiti</option>
            <option value="sa">Saudi</option>
            <option value="bh">Bahraini</option>
          </select>
          <span class="${gupSelectFieldClasses.icon}" aria-hidden="true">${unsafeHTML(ARROW_ICON)}</span>
        </div>
      </div>
      <button
        type="submit"
        class="gup-button gup-button--primary"
        style="margin-top: var(--gup-spacing-text-to-component)"
      >
        Submit
      </button>
    </form>
    <script>
      (function () {
        const form = document.getElementById('sf-req-form');
        const wrap = document.getElementById('sf-req-wrap');
        const select = document.getElementById('sf-req');
        const errEl = document.getElementById('sf-req-err');
        if (!select) return;

        function showError() {
          wrap.classList.add('${gupSelectFieldClasses.hasError}');
          errEl.style.display = '';
        }

        function clearError() {
          wrap.classList.remove('${gupSelectFieldClasses.hasError}');
          errEl.style.display = 'none';
        }

        select.addEventListener('change', function () {
          if (select.validity.valid) { clearError(); } else { showError(); }
        });

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (!select.validity.valid) {
            showError();
            select.focus();
          } else {
            clearError();
            console.log('Submitted:', select.value);
          }
        });
      })();
    </script>
  `,
};

export const RTL: Story = {
  render: (args) => html`
    <div class="${gupSelectFieldClasses.base}">
      <label class="${gupSelectFieldClasses.label}" for="sf-rtl">${args.label}</label>
      <span class="${gupFormClasses.hint}">اختر الخيار المناسب.</span>
      <div class="${gupSelectFieldClasses.wrapper}">
        <select class="${gupSelectFieldClasses.select}" id="sf-rtl" name="rtl-select">
          <option value="" disabled selected>اختر عنصر</option>
          <option value="item1">الخيار الأول</option>
          <option value="item2">الخيار الثاني</option>
          <option value="item3">الخيار الثالث</option>
        </select>
        <span class="${gupSelectFieldClasses.icon}" aria-hidden="true">${unsafeHTML(ARROW_ICON)}</span>
      </div>
    </div>
  `,
  args: { label: 'اسم الحقل' },
  parameters: { direction: 'rtl' },
};

/**
 * Lite select field (native `<select>`) alongside the web component equivalent.
 */
export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px; max-width: 400px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Class-based (lite) - native &lt;select&gt;</h4>
        <div class="${gupSelectFieldClasses.base}">
          <label class="${gupSelectFieldClasses.label}" for="sf-cmp-lite">Label</label>
          <div class="${gupSelectFieldClasses.wrapper}">
            <select class="${gupSelectFieldClasses.select}" id="sf-cmp-lite" name="sf-cmp-lite">
              <option value="" disabled selected>Select an item</option>
              <option value="item1">Item number 1</option>
              <option value="item2">Item number 2</option>
              <option value="item3">Item 3</option>
            </select>
            <span class="${gupSelectFieldClasses.icon}" aria-hidden="true">${unsafeHTML(ARROW_ICON)}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Web Component</h4>
        <gup-dropdown-field name="sf-cmp-wc" placeholder="Select an item">
          <span slot="label">Label</span>
          <gup-dropdown-menu>
            <gup-dropdown-menu-item label="Item number 1" value="item1"></gup-dropdown-menu-item>
            <gup-dropdown-menu-item label="Item number 2" value="item2"></gup-dropdown-menu-item>
            <gup-dropdown-menu-item label="Item 3" value="item3"></gup-dropdown-menu-item>
          </gup-dropdown-menu>
        </gup-dropdown-field>
      </div>
    </div>
  `,
};
