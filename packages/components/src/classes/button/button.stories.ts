import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupButton, GUP_BUTTON_CLASSES, type GupButtonOptions } from './button';

// Import the CSS - this would typically be imported in your app's entry point
import './button.css';

// Import icon component for icon examples
import '../../components/icon/icon';
// Import web component for comparison story
import '../../components/button/button';

interface ButtonStoryArgs extends GupButtonOptions {
  label: string;
}

type Story = StoryObj<ButtonStoryArgs>;

export default {
  title: 'Lite Components/Button',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'text', 'danger'],
      description: 'The visual appearance of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    inverted: {
      control: 'boolean',
      description: 'Whether to use inverted colors (for dark backgrounds)',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the button displays only an icon',
    },
    label: {
      control: 'text',
      description: 'The button label text',
    },
  },
  args: {
    appearance: 'primary',
    disabled: false,
    inverted: false,
    iconOnly: false,
    label: 'Click me',
  },
  parameters: {
    docs: {
      description: {
        component: `
## Class-based Button

An alternative to the \`<gup-button>\` web component for users who prefer working with native HTML elements.

### Usage

#### Pure HTML/CSS approach:
\`\`\`html
<button class="gup-button gup-button--primary">Primary Button</button>
<button class="gup-button gup-button--secondary">Secondary Button</button>
<a href="#" class="gup-button gup-button--text">Text Link</a>
\`\`\`

#### With TypeScript utility:
\`\`\`typescript
import { GupButton } from '@govom/components/classes/button';

// Apply to existing element
const btn = document.querySelector('button');
GupButton.apply(btn, { appearance: 'primary' });

// Create new button
const newBtn = GupButton.create({ appearance: 'secondary', disabled: true });
newBtn.textContent = 'Disabled Button';

// Get class string for templates
const className = GupButton.getClassName({ appearance: 'danger' });
// => "gup-button gup-button--danger"
\`\`\`

### Available Classes

| Class | Description |
|-------|-------------|
| \`.gup-button\` | Base class (required) |
| \`.gup-button--primary\` | Primary appearance |
| \`.gup-button--secondary\` | Secondary appearance |
| \`.gup-button--text\` | Text/link appearance |
| \`.gup-button--danger\` | Danger/destructive appearance |
| \`.gup-button--disabled\` | Disabled state |
| \`.gup-button--inverted\` | Inverted colors for dark backgrounds |
| \`.gup-button--icon-only\` | Icon-only button (circular) |
        `,
      },
    },
  },
} as Meta<ButtonStoryArgs>;

const Template = (args: ButtonStoryArgs) => {
  const className = GupButton.getClassName({
    appearance: args.appearance,
    disabled: args.disabled,
    inverted: args.inverted,
    iconOnly: args.iconOnly,
  });

  return html`
    <button class="${className}" ?disabled="${args.disabled}">
      ${args.label}
    </button>
  `;
};

export const Default: Story = {
  render: Template,
};

export const Primary: Story = {
  render: Template,
  args: {
    appearance: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  render: Template,
  args: {
    appearance: 'secondary',
    label: 'Secondary Button',
  },
};

export const Text: Story = {
  render: Template,
  args: {
    appearance: 'text',
    label: 'Text Button',
  },
};

export const Danger: Story = {
  render: Template,
  args: {
    appearance: 'danger',
    label: 'Danger Button',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    label: 'Disabled Button',
  },
};

export const AsLink: Story = {
  render: (args) => {
    const className = GupButton.getClassName({
      appearance: args.appearance,
      disabled: args.disabled,
      inverted: args.inverted,
    });

    return html`
      <a href="https://example.com" class="${className}">
        ${args.label}
      </a>
    `;
  },
  args: {
    label: 'Link styled as button',
  },
};

export const WithIconStart: Story = {
  render: (args) => {
    const className = GupButton.getClassName({
      appearance: args.appearance,
      disabled: args.disabled,
    });

    return html`
      <button class="${className}" ?disabled="${args.disabled}">
        <gup-icon class="${GUP_BUTTON_CLASSES.icon}" icon-name="add" height="24" width="24"></gup-icon>
        ${args.label}
      </button>
    `;
  },
  args: {
    label: 'Add Item',
  },
};

export const WithIconEnd: Story = {
  render: (args) => {
    const className = GupButton.getClassName({
      appearance: args.appearance,
      disabled: args.disabled,
    });

    return html`
      <button class="${className}" ?disabled="${args.disabled}">
        ${args.label}
        <gup-icon class="${GUP_BUTTON_CLASSES.icon}" icon-name="arrow-forward" height="24" width="24"></gup-icon>
      </button>
    `;
  },
  args: {
    label: 'Continue',
  },
};

export const IconOnly: Story = {
  render: (args) => {
    const className = GupButton.getClassName({
      appearance: args.appearance,
      disabled: args.disabled,
      iconOnly: true,
    });

    return html`
      <button class="${className}" ?disabled="${args.disabled}" title="Add item" aria-label="Add item">
        <gup-icon class="${GUP_BUTTON_CLASSES.icon}" icon-name="add" height="24" width="24"></gup-icon>
      </button>
    `;
  },
  args: {
    label: '',
  },
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Class-based (native button)</h4>
        <button class="${GupButton.getClassName({ appearance: 'primary' })}">
          <gup-icon class="${GUP_BUTTON_CLASSES.icon}" icon-name="add" height="24" width="24"></gup-icon>
          Native Button
        </button>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Web Component</h4>
        <gup-button>
          <gup-icon slot="icon-start" icon-name="add" height="24" width="24"></gup-icon>
          Web Component
        </gup-button>
      </div>
    </div>
  `,
};
