import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupTextareaClasses, type GupTextareaOptions } from './textarea-field';
import { gupFormClasses } from '../forms';

import './textarea-field.css';
import '../forms.css';

import '../../../components/src/components/textarea-field/textarea-field';

const ERROR_ICON_PATH = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${ERROR_ICON_PATH}"/></svg>`;

interface TextareaStoryArgs extends GupTextareaOptions {
  label: string;
  hint: string;
  error: string;
}

type Story = StoryObj<TextareaStoryArgs>;

export default {
  title: 'Lite Components - WIP/Forms/Textarea',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text',
    },
    hint: {
      control: 'text',
      description: 'Optional hint text below the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
      table: {
        defaultValue: { summary: '4' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
  },
  args: {
    label: 'Your message',
    hint: '',
    disabled: false,
    placeholder: '',
    rows: 4,
    required: false,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Textarea

An alternative to the \`<gup-textarea-field>\` web component for users who prefer working with native HTML elements.
Focus and disabled state styling is driven by native pseudo-classes - no JavaScript required.

### Usage

#### Pure HTML/CSS approach:
\`\`\`html
<div class="gup-textarea">
  <label class="gup-textarea__label" for="msg">Your message</label>
  <!-- Optional: hint below label, above error -->
  <span class="gup-form-hint">Helper text goes here.</span>
  <!-- Optional: error below hint, above textarea -->
  <span class="gup-form-error">Error message.</span>
  <div class="gup-textarea__wrapper">
    <textarea class="gup-textarea__input" id="msg" name="message" rows="4"></textarea>
  </div>
</div>
\`\`\`

#### With TypeScript utility:
\`\`\`typescript
import { GupTextarea } from '@govom/lite-components';

const field = GupTextarea.create('Your message', {
  name: 'message',
  rows: 4,
  placeholder: 'Type here...',
});
document.body.appendChild(field);
\`\`\`

### Available Classes

| Class | Description |
|-------|-------------|
| \`.gup-textarea\` | Base wrapper element (required) |
| \`.gup-textarea__label\` | Label element |
| \`.gup-textarea__wrapper\` | Border and background container |
| \`.gup-textarea__input\` | Native \`<textarea>\` element |
| \`.gup-form-hint\` | Optional hint text below the label, above the error |
| \`.gup-form-error\` | Error message below the hint, above the textarea |
| \`.gup-textarea--error\` | Error state modifier on the wrapper |
        `,
      },
    },
  },
} as Meta<TextareaStoryArgs>;

const Template = (args: TextareaStoryArgs) => html`
  <div class="${args.error ? `${gupTextareaClasses.base} ${gupTextareaClasses.hasError}` : gupTextareaClasses.base}">
    <label class="${gupTextareaClasses.label}" for="story-textarea">${args.label}</label>
    ${args.hint ? html`<span class="${gupFormClasses.hint}">${args.hint}</span>` : ''}
    ${args.error ? html`<span class="${gupFormClasses.error}">${unsafeHTML(errorIcon)}${args.error}</span>` : ''}
    <div class="${gupTextareaClasses.wrapper}">
      <textarea
        class="${gupTextareaClasses.input}"
        id="story-textarea"
        rows="${args.rows ?? 4}"
        ?disabled="${args.disabled}"
        ?required="${args.required}"
        placeholder="${args.placeholder ?? ''}"
      ></textarea>
    </div>
  </div>
`;

export const Default: Story = {
  render: Template,
};

export const WithHint: Story = {
  render: Template,
  args: {
    hint: 'This is helper text. Use it when you want to communicate a message.',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    error: 'This field is required.',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithRows: Story = {
  render: Template,
  args: {
    rows: 8,
  },
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Class-based (native textarea)</h4>
        <div class="${gupTextareaClasses.base}">
          <label class="${gupTextareaClasses.label}" for="compare-lite">Your message</label>
          <div class="${gupTextareaClasses.wrapper}">
            <textarea class="${gupTextareaClasses.input}" id="compare-lite" rows="4"></textarea>
          </div>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Web Component</h4>
        <gup-textarea-field name="message">Your message</gup-textarea-field>
      </div>
    </div>
  `,
};
