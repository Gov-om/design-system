import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupToggle, gupToggleClasses, type GupToggleOptions } from './toggle';
import { gupFormClasses } from '../forms';

import './toggle.css';
import '../forms.css';

import '../../../components/src/components/toggle/toggle';

interface ToggleStoryArgs extends GupToggleOptions {
  label: string;
  hint: string;
}

type Story = StoryObj<ToggleStoryArgs>;

export default {
  title: 'Lite Components - WIP/Forms/Toggle',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is on',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    knobLocation: {
      control: 'select',
      options: ['before', 'after'],
      description: 'Whether the knob appears before or after the label text',
      table: {
        defaultValue: { summary: 'before' },
      },
    },
    label: {
      control: 'text',
      description: 'The toggle label text',
    },
    hint: {
      control: 'text',
      description: 'Optional hint text below the label',
    },
  },
  args: {
    checked: false,
    disabled: false,
    knobLocation: 'before',
    label: 'Toggle label',
    hint: '',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Toggle

An alternative to the \`<gup-toggle>\` web component for users who prefer working with native HTML elements.
State styling is driven by native input pseudo-classes (\`:checked\`, \`:disabled\`) via sibling selectors — the toggle works on click with no JavaScript required.

### Usage

#### Pure HTML/CSS approach:
\`\`\`html
<label class="gup-toggle">
  <input type="checkbox" class="gup-toggle__input" name="notifications" />
  <div class="gup-toggle__box">
    <div class="gup-toggle__knob"></div>
  </div>
  <div class="gup-toggle__text-container">Enable notifications</div>
</label>
\`\`\`

#### With hint text:
\`\`\`html
<label class="gup-toggle">
  <input type="checkbox" class="gup-toggle__input" name="notifications" />
  <div class="gup-toggle__box">
    <div class="gup-toggle__knob"></div>
  </div>
  <div class="gup-toggle__text-container">
    Enable notifications
    <span class="gup-form-hint">You can change this later in settings.</span>
  </div>
</label>
\`\`\`

#### With TypeScript utility:
\`\`\`typescript
import { GupToggle } from '@govom/lite-components';

const toggle = GupToggle.create('Enable notifications', { checked: true });
document.body.appendChild(toggle);
\`\`\`

### Available Classes

| Class | Description |
|-------|-------------|
| \`.gup-toggle\` | Base class on the label element (required) |
| \`.gup-toggle__input\` | Native checkbox input (visually hidden) |
| \`.gup-toggle__box\` | The toggle track |
| \`.gup-toggle__knob\` | The sliding knob inside the track |
| \`.gup-toggle__text-container\` | Label and hint text container |
| \`.gup-form-hint\` | Optional hint text inside the text container |
| \`.gup-toggle--label-first\` | Places the label text before the toggle box |
        `,
      },
    },
  },
} as Meta<ToggleStoryArgs>;

const Template = (args: ToggleStoryArgs) => html`
  <label class="${GupToggle.getClassName({ knobLocation: args.knobLocation })}">
    <input
      type="checkbox"
      class="${gupToggleClasses.input}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
    />
    <div class="${gupToggleClasses.box}">
      <div class="${gupToggleClasses.knob}"></div>
    </div>
    <div class="${gupToggleClasses.textContainer}">
      <div>${args.label}</div>
      ${args.hint ? html`<span class="${gupFormClasses.hint}">${args.hint}</span>` : ''}
    </div>
  </label>
`;

export const Default: Story = {
  render: Template,
};

export const Checked: Story = {
  render: Template,
  args: {
    checked: true,
    label: 'Enabled',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: Template,
  args: {
    checked: true,
    disabled: true,
    label: 'Enabled (disabled)',
  },
};

export const WithHint: Story = {
  render: Template,
  args: {
    hint: 'You can change this later in settings.',
  },
};

export const LabelFirst: Story = {
  render: Template,
  args: {
    knobLocation: 'after',
    label: 'Label before knob',
  },
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Class-based (native checkbox - click to toggle)</h4>
        <label class="${gupToggleClasses.base}">
          <input type="checkbox" class="${gupToggleClasses.input}" />
          <div class="${gupToggleClasses.box}">
            <div class="${gupToggleClasses.knob}"></div>
          </div>
          <div class="${gupToggleClasses.textContainer}">Toggle label</div>
        </label>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Web Component</h4>
        <gup-toggle name="compare-wc">Toggle label</gup-toggle>
      </div>
    </div>
  `,
};
