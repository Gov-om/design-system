import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupCheckbox, GUP_CHECKBOX_CLASSES, type GupCheckboxOptions } from './checkbox';

// Import the CSS - this would typically be imported in your app's entry point
import './checkbox.css';

// Import web component for comparison story
import '../../components/checkbox/checkbox';

interface CheckboxStoryArgs extends GupCheckboxOptions {
  label: string;
  hint: string;
}

type Story = StoryObj<CheckboxStoryArgs>;

export default {
  title: 'Lite Components/Forms/Checkbox',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    size: {
      control: 'select',
      options: ['m', 's'],
      description: 'The size of the checkbox',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    appearance: {
      control: 'select',
      options: ['default', 'circle'],
      description: 'The appearance of the checkbox',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'The checkbox label text',
    },
    hint: {
      control: 'text',
      description: 'Optional hint text below the label',
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'm',
    appearance: 'default',
    label: 'Checkbox label',
    hint: '',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Checkbox

An alternative to the \`<gup-checkbox>\` web component for users who prefer working with native HTML elements.
State styling is driven by native input pseudo-classes (\`:checked\`, \`:indeterminate\`, \`:disabled\`) — the checkbox works on click with no JavaScript required. Check and indeterminate icons are rendered via CSS (SVG mask-image), so no icon web components are needed.

### Usage

#### Pure HTML/CSS approach:
\`\`\`html
<label class="gup-checkbox">
  <input type="checkbox" class="gup-checkbox__input" />
  <div class="gup-checkbox__check-mark">
    <div class="gup-checkbox__check-mark-inner"></div>
  </div>
  <div class="gup-checkbox__text-container">Accept terms</div>
</label>
\`\`\`

#### With TypeScript utility:
\`\`\`typescript
import { GupCheckbox } from '@gup-ds/components/classes/checkbox';

// Create a new checkbox
const checkbox = GupCheckbox.create({ checked: true });
checkbox.querySelector('.gup-checkbox__text-container').textContent = 'Accept terms';
document.body.appendChild(checkbox);

// Get class string for templates (only appearance classes)
const className = GupCheckbox.getClassName({ size: 's', appearance: 'circle' });
// => "gup-checkbox gup-checkbox--small gup-checkbox--circle"
\`\`\`

### Available Classes

| Class | Description |
|-------|-------------|
| \`.gup-checkbox\` | Base class on the label element (required) |
| \`.gup-checkbox__input\` | Native checkbox input (visually hidden) |
| \`.gup-checkbox__check-mark\` | Outer check-mark box |
| \`.gup-checkbox__check-mark-inner\` | Inner container (icon rendered via CSS \`::after\`) |
| \`.gup-checkbox__text-container\` | Label text container |
| \`.gup-checkbox__hint\` | Optional hint text below the label |
| \`.gup-checkbox--small\` | Small size variant |
| \`.gup-checkbox--circle\` | Circle appearance |
        `,
      },
    },
  },
} as Meta<CheckboxStoryArgs>;

const Template = (args: CheckboxStoryArgs) => {
  const className = GupCheckbox.getClassName({
    size: args.size,
    appearance: args.appearance,
  });

  return html`
    <label class="${className}">
      <input
        type="checkbox"
        class="${GUP_CHECKBOX_CLASSES.input}"
        ?checked="${args.checked}"
        ?disabled="${args.disabled}"
        .indeterminate="${args.indeterminate ?? false}"
      />
      <div class="${GUP_CHECKBOX_CLASSES.checkMark}">
        <div class="${GUP_CHECKBOX_CLASSES.checkMarkInner}"></div>
      </div>
      <div class="${GUP_CHECKBOX_CLASSES.textContainer}">
        <div>${args.label}</div>
        ${args.hint ? html`<div class="${GUP_CHECKBOX_CLASSES.hint}">${args.hint}</div>` : ''}
      </div>
    </label>
  `;
};

export const Default: Story = {
  render: Template,
};

export const Checked: Story = {
  render: Template,
  args: {
    checked: true,
    label: 'Checked',
  },
};

export const Indeterminate: Story = {
  render: Template,
  args: {
    indeterminate: true,
    label: 'Indeterminate',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    label: 'Disabled',
  },
};

export const Small: Story = {
  render: Template,
  args: {
    size: 's',
    label: 'Small',
  },
};

export const Circle: Story = {
  render: Template,
  args: {
    appearance: 'circle',
    label: 'Circle',
  },
};

export const WithHint: Story = {
  render: Template,
  args: {
    label: 'With hint',
    hint: 'This is helper text. Use it when you want to communicate a message.',
  },
};

export const CheckboxGroup: Story = {
  render: () => html`
    <fieldset>
      <legend style="font-size: var(--font-size-500); font-weight: 600; margin-bottom: 4px;">
        Which types of notifications do you want to receive?
      </legend>
      <div style="color: var(--gup-color-content-secondary); font-size: var(--font-size-300); margin-bottom: 16px;">
        Select all that apply
      </div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <label class="gup-checkbox">
          <input type="checkbox" class="${GUP_CHECKBOX_CLASSES.input}" name="notifications" value="email" />
          <div class="${GUP_CHECKBOX_CLASSES.checkMark}">
            <div class="${GUP_CHECKBOX_CLASSES.checkMarkInner}"></div>
          </div>
          <div class="${GUP_CHECKBOX_CLASSES.textContainer}">
            <div>Email notifications</div>
            <div class="${GUP_CHECKBOX_CLASSES.hint}">Receive updates via email</div>
          </div>
        </label>

        <label class="gup-checkbox">
          <input type="checkbox" class="${GUP_CHECKBOX_CLASSES.input}" name="notifications" value="sms" />
          <div class="${GUP_CHECKBOX_CLASSES.checkMark}">
            <div class="${GUP_CHECKBOX_CLASSES.checkMarkInner}"></div>
          </div>
          <div class="${GUP_CHECKBOX_CLASSES.textContainer}">
            <div>SMS notifications</div>
            <div class="${GUP_CHECKBOX_CLASSES.hint}">Receive updates via text message</div>
          </div>
        </label>

        <label class="gup-checkbox">
          <input type="checkbox" class="${GUP_CHECKBOX_CLASSES.input}" name="notifications" value="push" />
          <div class="${GUP_CHECKBOX_CLASSES.checkMark}">
            <div class="${GUP_CHECKBOX_CLASSES.checkMarkInner}"></div>
          </div>
          <div class="${GUP_CHECKBOX_CLASSES.textContainer}">
            <div>Push notifications</div>
            <div class="${GUP_CHECKBOX_CLASSES.hint}">Receive updates via browser push notifications</div>
          </div>
        </label>

        <label class="gup-checkbox">
          <input type="checkbox" class="${GUP_CHECKBOX_CLASSES.input}" name="notifications" value="none" disabled />
          <div class="${GUP_CHECKBOX_CLASSES.checkMark}">
            <div class="${GUP_CHECKBOX_CLASSES.checkMarkInner}"></div>
          </div>
          <div class="${GUP_CHECKBOX_CLASSES.textContainer}">
            <div>In-app notifications</div>
            <div class="${GUP_CHECKBOX_CLASSES.hint}">Currently unavailable</div>
          </div>
        </label>
      </div>
    </fieldset>
  `,
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Class-based (native checkbox — click to toggle)</h4>
        <label class="gup-checkbox">
          <input type="checkbox" class="${GUP_CHECKBOX_CLASSES.input}" />
          <div class="${GUP_CHECKBOX_CLASSES.checkMark}">
            <div class="${GUP_CHECKBOX_CLASSES.checkMarkInner}"></div>
          </div>
          <div class="${GUP_CHECKBOX_CLASSES.textContainer}">Native Checkbox</div>
        </label>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Web Component</h4>
        <gup-checkbox>Web Component</gup-checkbox>
      </div>
    </div>
  `,
};
