import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupInputFieldClasses, type GupInputFieldOptions } from './input-field';
/* eslint-disable import/no-unresolved */
import { gupFormClasses } from '../forms';
import './input-field.css';
import '../forms.css';
/* eslint-enable import/no-unresolved */
import '../button/button.css';

type Story = StoryObj<InputFieldStoryArgs>;

const ERROR_ICON_PATH = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${ERROR_ICON_PATH}"/></svg>`;

interface InputFieldStoryArgs extends GupInputFieldOptions {
  label: string;
  hint: string;
  error: string;
}

export default {
  title: 'Lite Components - WIP/Forms/Input field',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    hint: { control: 'text', description: 'Optional hint text shown below the label' },
    error: { control: 'text', description: 'Error message - also enables the error state' },
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'url', 'number', 'password'],
      description: 'Input type',
    },
    placeholder: { control: 'text', description: 'Placeholder text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    required: { control: 'boolean', description: 'Required field' },
    readonly: { control: 'boolean', description: 'Read-only state' },
    value: { control: 'text', description: 'Initial value' },
  },
  args: {
    label: 'Full name',
    hint: '',
    error: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    required: false,
    readonly: false,
    value: '',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Input Field

An alternative to the \`<gup-input-field>\` web component for projects that prefer native HTML elements.

Focus and disabled styling is handled by CSS using native pseudo-classes. The error state uses a modifier class combined with a small inline script for blur / submit validation.

**Excluded from this lite version:**
- Input-start / input-end icons (calendar, email icon, phone icon, password show/hide toggle)

**Date and time inputs:** use \`type="date"\` and \`type="time"\`. The CSS hides the native picker indicator so the user types directly into the day/month/year or hour/minute segments - no picker popup on desktop. On mobile devices the native picker will still appear.

### Usage

\`\`\`html
<div class="gup-input-field">
  <label class="gup-input-field__label" for="name">Full name</label>
  <!-- optional hint (requires forms.css) -->
  <span class="gup-form-hint">Enter your name as it appears on your ID.</span>
  <!-- optional error - add gup-input-field--error to the outer div when invalid -->
  <span class="gup-form-error" id="name-error" role="alert" style="display:none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <span id="name-error-text"></span>
  </span>
  <div class="gup-input-field__wrapper">
    <input class="gup-input-field__input" id="name" type="text" name="name" required>
  </div>
</div>
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-input-field\` | Base class on the outer \`<div>\` (required) |
| \`.gup-input-field--error\` | Error state - changes border and label colour |
| \`.gup-input-field__label\` | The \`<label>\` element |
| \`.gup-input-field__wrapper\` | Flex wrapper for prefix, input, and suffix |
| \`.gup-input-field__input\` | The \`<input>\` element |
| \`.gup-input-field__prefix\` | Optional decorative text before the input |
| \`.gup-input-field__suffix\` | Optional decorative text after the input |
| \`.gup-form-hint\` | Hint text (from \`forms.css\`) |
| \`.gup-form-error\` | Error message with icon (from \`forms.css\`) |
        `,
      },
    },
  },
} as Meta;

/** Reusable helper for static / args-driven stories without inline validation */
const field = (id: string, args: InputFieldStoryArgs, overrides: Partial<InputFieldStoryArgs> = {}) => {
  const merged = { ...args, ...overrides };
  return html`
    <div class="${gupInputFieldClasses.base} ${merged.error ? gupInputFieldClasses.hasError : ''}">
      <label class="${gupInputFieldClasses.label}" for="${id}">${merged.label}</label>
      ${merged.hint ? html`<span class="${gupFormClasses.hint}">${merged.hint}</span>` : ''}
      ${merged.error ? html`<span class="${gupFormClasses.error}" role="alert">${unsafeHTML(errorIcon)}${merged.error}</span>` : ''}
      <div class="${gupInputFieldClasses.wrapper}">
        <input
          class="${gupInputFieldClasses.input}"
          id="${id}"
          type="${merged.type || 'text'}"
          name="${merged.name || id}"
          ?disabled=${merged.disabled}
          ?required=${merged.required}
          ?readonly=${merged.readonly}
          placeholder="${merged.placeholder || ''}"
          value="${merged.value || ''}"
        >
      </div>
    </div>
  `;
};

export const Default: Story = {
  render: (args) => field('if-default', args),
};

export const WithHint: Story = {
  render: (args) => field('if-hint', args),
  args: {
    hint: 'Enter your name as it appears on your ID card.',
  },
};

export const WithError: Story = {
  render: (args) => field('if-error', args),
  args: {
    error: 'This field is required.',
  },
};

export const WithHintAndError: Story = {
  render: (args) => field('if-hint-error', args),
  args: {
    hint: 'Enter your name as it appears on your ID card.',
    error: 'This field is required.',
  },
};

/**
 * Uses type="email". Validates format on blur - shows an inline error when the
 * entered value is not a valid email address.
 */
export const Email: Story = {
  render: () => html`
    <div class="gup-input-field" id="if-email-wrap">
      <label class="gup-input-field__label" for="if-email">Email address</label>
      <span class="gup-form-hint">We will send a confirmation to this address.</span>
      <span class="gup-form-error" id="if-email-err" role="alert" style="display:none">
        ${unsafeHTML(errorIcon)}
        <span id="if-email-err-text"></span>
      </span>
      <div class="gup-input-field__wrapper">
        <input
          class="gup-input-field__input"
          id="if-email"
          type="email"
          name="email"
          placeholder="name@example.com"
        >
      </div>
    </div>
    <script>
      (function () {
        const wrap = document.getElementById('if-email-wrap');
        const input = document.getElementById('if-email');
        const errEl = document.getElementById('if-email-err');
        const errText = document.getElementById('if-email-err-text');
        if (!input) return;
        input.addEventListener('blur', function () {
          if (!input.validity.valid && input.value !== '') {
            wrap.classList.add('gup-input-field--error');
            errEl.style.display = '';
            errText.textContent = 'Enter a valid email address.';
          } else {
            wrap.classList.remove('gup-input-field--error');
            errEl.style.display = 'none';
          }
        });
      })();
    </script>
  `,
};

/**
 * Uses type="tel" with a pattern for Omani phone numbers. Validates on blur.
 */
export const Phone: Story = {
  render: () => html`
    <div class="gup-input-field" id="if-phone-wrap">
      <label class="gup-input-field__label" for="if-phone">Phone number</label>
      <span class="gup-form-hint">Include the country code, e.g. +96812345678</span>
      <span class="gup-form-error" id="if-phone-err" role="alert" style="display:none">
        ${unsafeHTML(errorIcon)}
        <span id="if-phone-err-text"></span>
      </span>
      <div class="gup-input-field__wrapper">
        <input
          class="gup-input-field__input"
          id="if-phone"
          type="tel"
          name="phone"
          placeholder="+96812345678"
          pattern="\\+968[0-9]{8}"
        >
      </div>
    </div>
    <script>
      (function () {
        const wrap = document.getElementById('if-phone-wrap');
        const input = document.getElementById('if-phone');
        const errEl = document.getElementById('if-phone-err');
        const errText = document.getElementById('if-phone-err-text');
        if (!input) return;
        input.addEventListener('blur', function () {
          if (!input.validity.valid && input.value !== '') {
            wrap.classList.add('gup-input-field--error');
            errEl.style.display = '';
            errText.textContent = 'Enter a valid Omani phone number starting with +968.';
          } else {
            wrap.classList.remove('gup-input-field--error');
            errEl.style.display = 'none';
          }
        });
      })();
    </script>
  `,
};

export const URL: Story = {
  render: () => html`
    <div class="${gupInputFieldClasses.base}">
      <label class="${gupInputFieldClasses.label}" for="if-url">Website</label>
      <div class="${gupInputFieldClasses.wrapper}">
        <span class="${gupInputFieldClasses.prefix}">https://</span>
        <input
          class="${gupInputFieldClasses.input}"
          id="if-url"
          type="text"
          name="website"
          placeholder="www.example.com"
        >
      </div>
    </div>
  `,
};

export const Password: Story = {
  render: (args) => field('if-password', args),
  args: {
    label: 'Password',
    type: 'password',
    hint: 'Must be at least 8 characters.',
  },
};

export const Number: Story = {
  render: (args) => field('if-number', args),
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '18',
  },
};

/**
 * Uses type="date". The browser renders day/month/year segments that the user
 * fills by typing - the native calendar picker icon is hidden by CSS.
 * On mobile devices the native date picker will still appear.
 */
export const Date: Story = {
  render: () => html`
    <div class="${gupInputFieldClasses.base}">
      <label class="${gupInputFieldClasses.label}" for="if-date">Date of birth</label>
      <span class="${gupFormClasses.hint}">Day, month, and year</span>
      <div class="${gupInputFieldClasses.wrapper}">
        <input
          class="${gupInputFieldClasses.input}"
          id="if-date"
          type="date"
          name="dob"
        >
      </div>
    </div>
  `,
};

/**
 * Uses type="time". The browser renders hour/minute segments - the native clock
 * picker icon is hidden by CSS. On mobile devices the native time picker will
 * still appear.
 */
export const Time: Story = {
  render: () => html`
    <div class="${gupInputFieldClasses.base}">
      <label class="${gupInputFieldClasses.label}" for="if-time">Appointment time</label>
      <span class="${gupFormClasses.hint}">24-hour format, e.g. 14:30</span>
      <div class="${gupInputFieldClasses.wrapper}">
        <input
          class="${gupInputFieldClasses.input}"
          id="if-time"
          type="time"
          name="appointment-time"
        >
      </div>
    </div>
  `,
};

export const WithPrefix: Story = {
  render: () => html`
    <div class="${gupInputFieldClasses.base}">
      <label class="${gupInputFieldClasses.label}" for="if-prefix">Website</label>
      <div class="${gupInputFieldClasses.wrapper}">
        <span class="${gupInputFieldClasses.prefix}">https://</span>
        <input class="${gupInputFieldClasses.input}" id="if-prefix" type="text" name="website">
      </div>
    </div>
  `,
};

export const WithSuffix: Story = {
  render: () => html`
    <div class="${gupInputFieldClasses.base}">
      <label class="${gupInputFieldClasses.label}" for="if-suffix">Username</label>
      <div class="${gupInputFieldClasses.wrapper}">
        <input class="${gupInputFieldClasses.input}" id="if-suffix" type="text" name="username">
        <span class="${gupInputFieldClasses.suffix}">@example.com</span>
      </div>
    </div>
  `,
};

export const WithPrefixAndSuffix: Story = {
  render: () => html`
    <div class="${gupInputFieldClasses.base}">
      <label class="${gupInputFieldClasses.label}" for="if-affix">Amount</label>
      <div class="${gupInputFieldClasses.wrapper}">
        <span class="${gupInputFieldClasses.prefix}">OMR</span>
        <input
          class="${gupInputFieldClasses.input}"
          id="if-affix"
          type="text"
          inputmode="decimal"
          name="amount"
          placeholder="0.000"
        >
      </div>
    </div>
  `,
};

export const Disabled: Story = {
  render: (args) => field('if-disabled', args),
  args: {
    label: 'Full name',
    disabled: true,
    value: 'Ahmed Al-Farsi',
  },
};

export const Readonly: Story = {
  render: (args) => field('if-readonly', args),
  args: {
    label: 'Civil ID number',
    readonly: true,
    value: '92345678',
  },
};

/**
 * Demonstrates inline validation: the error appears on blur when the field is
 * empty, and the form submission is blocked until the value is filled.
 */
export const Required: Story = {
  render: () => html`
    <form id="if-req-form" novalidate>
      <div class="gup-input-field" id="if-req-wrap">
        <label class="gup-input-field__label" for="if-req">Full name</label>
        <span class="gup-form-error" id="if-req-err" role="alert" style="display:none">
          ${unsafeHTML(errorIcon)}
          <span id="if-req-err-text">This field is required.</span>
        </span>
        <div class="gup-input-field__wrapper">
          <input
            class="gup-input-field__input"
            id="if-req"
            type="text"
            name="full-name"
            required
          >
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
        const form = document.getElementById('if-req-form');
        const wrap = document.getElementById('if-req-wrap');
        const input = document.getElementById('if-req');
        const errEl = document.getElementById('if-req-err');
        if (!input) return;

        function showError() {
          wrap.classList.add('gup-input-field--error');
          errEl.style.display = '';
        }

        function clearError() {
          wrap.classList.remove('gup-input-field--error');
          errEl.style.display = 'none';
        }

        input.addEventListener('blur', function () {
          if (!input.validity.valid) { showError(); } else { clearError(); }
        });

        input.addEventListener('input', function () {
          if (input.validity.valid) { clearError(); }
        });

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (!input.validity.valid) {
            showError();
            input.focus();
          } else {
            clearError();
            console.log('Submitted:', input.value);
          }
        });
      })();
    </script>
  `,
};

export const RTL: Story = {
  render: (args) => field('if-rtl', args),
  args: {
    label: 'الاسم الكامل',
    hint: 'أدخل اسمك كما يظهر على بطاقة الهوية.',
  },
  parameters: {
    direction: 'rtl',
  },
};
