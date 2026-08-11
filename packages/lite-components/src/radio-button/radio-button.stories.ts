import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupRadioButton, gupRadioClasses, gupRadioGroupClasses, type GupRadioButtonOptions } from './radio-button';
import { gupFormClasses } from '../forms';

import './radio-button.css';
import '../forms.css';
import '../../../components/src/components/radio-button/radio-button';
import '../../../components/src/components/radio-button-group/radio-button-group';

const ERROR_ICON_PATH = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${ERROR_ICON_PATH}"/></svg>`;

interface RadioStoryArgs extends GupRadioButtonOptions {
  label: string;
  hint: string;
}

type Story = StoryObj<RadioStoryArgs>;

export default {
  title: 'Lite Components - WIP/Forms/Radio Button',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether this radio button is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether this radio button is disabled',
    },
    size: {
      control: 'select',
      options: ['m', 's'],
      description: 'The size of the radio button',
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    label: {
      control: 'text',
      description: 'The radio button label text',
    },
    hint: {
      control: 'text',
      description: 'Optional hint text below the label',
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'm',
    label: 'Radio label',
    hint: '',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Radio Button

An alternative to the \`<gup-radio-button>\` / \`<gup-radio-button-group>\` web components for users who prefer working with native HTML elements.
State styling is driven by native input pseudo-classes (\`:checked\`, \`:disabled\`) - the radio works on click with no JavaScript required.

### Usage

#### Pure HTML/CSS approach:
\`\`\`html
<fieldset class="gup-radio-group">
  <legend class="gup-radio-group__label">Pick an option</legend>
  <!-- Optional: hint below label, above error and options -->
  <span class="gup-form-hint">Helper text goes here.</span>
  <!-- Optional: error below hint, above options -->
  <span class="gup-form-error">Error message.</span>
  <div class="gup-radio-group__options">
    <label class="gup-radio">
      <input type="radio" class="gup-radio__input" name="choice" value="a" />
      <div class="gup-radio__box">
        <div class="gup-radio__box-inner">
          <div class="gup-radio__pupil"></div>
        </div>
      </div>
      <div class="gup-radio__text-container">Option A</div>
    </label>
    <label class="gup-radio">
      <input type="radio" class="gup-radio__input" name="choice" value="b" />
      <div class="gup-radio__box">
        <div class="gup-radio__box-inner">
          <div class="gup-radio__pupil"></div>
        </div>
      </div>
      <div class="gup-radio__text-container">Option B</div>
    </label>
  </div>
</fieldset>
\`\`\`

#### With TypeScript utility:
\`\`\`typescript
import { GupRadioButton, GupRadioGroup } from '@govom/lite-components';

// Create a group
const group = GupRadioGroup.create('Pick an option');
const optionsContainer = group.querySelector('.gup-radio-group__options');

// Create individual radio buttons
const radioA = GupRadioButton.create({ name: 'choice', value: 'a', checked: true });
radioA.querySelector('.gup-radio__text-container').textContent = 'Option A';
optionsContainer.appendChild(radioA);

const radioB = GupRadioButton.create({ name: 'choice', value: 'b' });
radioB.querySelector('.gup-radio__text-container').textContent = 'Option B';
optionsContainer.appendChild(radioB);

document.body.appendChild(group);
\`\`\`

### Available Classes

#### Radio button
| Class | Description |
|-------|-------------|
| \`.gup-radio\` | Base class on the label element (required) |
| \`.gup-radio__input\` | Native radio input (visually hidden) |
| \`.gup-radio__box\` | Outer circular box |
| \`.gup-radio__box-inner\` | Inner container (handles hover border) |
| \`.gup-radio__pupil\` | Inner dot, visible when checked |
| \`.gup-radio__text-container\` | Label text container |
| \`.gup-radio__hint\` | Optional hint text below the label |
| \`.gup-radio--small\` | Small size variant |

#### Radio group
| Class | Description |
|-------|-------------|
| \`.gup-radio-group\` | Base class on the \`<fieldset>\` element |
| \`.gup-radio-group__label\` | Group label (use on \`<legend>\`) |
| \`.gup-radio-group__options\` | Container for radio button items |
| \`.gup-form-hint\` | Optional hint text below the legend, above the error and options |
| \`.gup-form-error\` | Error message below the hint, above the options |
| \`.gup-radio-group--error\` | Error state modifier on the fieldset |
        `,
      },
    },
  },
} as Meta<RadioStoryArgs>;

const RadioTemplate = (args: RadioStoryArgs) => html`
  <label class="${GupRadioButton.getClassName({ size: args.size })}">
    <input
      type="radio"
      class="${gupRadioClasses.input}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
    />
    <div class="${gupRadioClasses.box}">
      <div class="${gupRadioClasses.boxInner}">
        <div class="${gupRadioClasses.pupil}"></div>
      </div>
    </div>
    <div class="${gupRadioClasses.textContainer}">
      <div>${args.label}</div>
      ${args.hint ? html`<div class="${gupFormClasses.hint}">${args.hint}</div>` : ''}
    </div>
  </label>
`;

export const Default: Story = {
  render: RadioTemplate,
};

export const Checked: Story = {
  render: RadioTemplate,
  args: {
    checked: true,
    label: 'Selected option',
  },
};

export const Disabled: Story = {
  render: RadioTemplate,
  args: {
    disabled: true,
    label: 'Disabled option',
  },
};

export const DisabledChecked: Story = {
  render: RadioTemplate,
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled and checked',
  },
};

export const Small: Story = {
  render: RadioTemplate,
  args: {
    size: 's',
    label: 'Small option',
  },
};

export const WithHint: Story = {
  render: RadioTemplate,
  args: {
    label: 'Option',
    hint: 'This is helper text. Use it when you want to communicate a message.',
  },
};

export const RadioGroup: Story = {
  render: () => html`
    <fieldset class="${gupRadioGroupClasses.base}">
      <legend class="${gupRadioGroupClasses.label}">Notification preference</legend>
      <span class="${gupFormClasses.hint}">Your selection will apply to all services.</span>
      <div class="${gupRadioGroupClasses.options}">
        <label class="${GupRadioButton.getClassName()}">
          <input type="radio" class="${gupRadioClasses.input}" name="notif" value="email" checked />
          <div class="${gupRadioClasses.box}">
            <div class="${gupRadioClasses.boxInner}"><div class="${gupRadioClasses.pupil}"></div></div>
          </div>
          <div class="${gupRadioClasses.textContainer}">Email</div>
        </label>
        <label class="${GupRadioButton.getClassName()}">
          <input type="radio" class="${gupRadioClasses.input}" name="notif" value="sms" />
          <div class="${gupRadioClasses.box}">
            <div class="${gupRadioClasses.boxInner}"><div class="${gupRadioClasses.pupil}"></div></div>
          </div>
          <div class="${gupRadioClasses.textContainer}">SMS</div>
        </label>
        <label class="${GupRadioButton.getClassName()}">
          <input type="radio" class="${gupRadioClasses.input}" name="notif" value="none" />
          <div class="${gupRadioClasses.box}">
            <div class="${gupRadioClasses.boxInner}"><div class="${gupRadioClasses.pupil}"></div></div>
          </div>
          <div class="${gupRadioClasses.textContainer}">None</div>
        </label>
      </div>
    </fieldset>
  `,
};

export const WithError: Story = {
  render: () => html`
    <fieldset class="${gupRadioGroupClasses.base} ${gupRadioGroupClasses.hasError}">
      <legend class="${gupRadioGroupClasses.label}">Pick an option</legend>
      <span class="${gupFormClasses.error}">
        ${unsafeHTML(errorIcon)}
        Please select an option to continue.
      </span>
      <div class="${gupRadioGroupClasses.options}">
        <label class="${GupRadioButton.getClassName()}">
          <input type="radio" class="${gupRadioClasses.input}" name="error-demo" value="a" required />
          <div class="${gupRadioClasses.box}">
            <div class="${gupRadioClasses.boxInner}"><div class="${gupRadioClasses.pupil}"></div></div>
          </div>
          <div class="${gupRadioClasses.textContainer}">Option A</div>
        </label>
        <label class="${GupRadioButton.getClassName()}">
          <input type="radio" class="${gupRadioClasses.input}" name="error-demo" value="b" />
          <div class="${gupRadioClasses.box}">
            <div class="${gupRadioClasses.boxInner}"><div class="${gupRadioClasses.pupil}"></div></div>
          </div>
          <div class="${gupRadioClasses.textContainer}">Option B</div>
        </label>
      </div>
    </fieldset>
  `,
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Class-based (native radio - click to select)</h4>
        <fieldset class="${gupRadioGroupClasses.base}">
          <legend class="${gupRadioGroupClasses.label}">Native radio group</legend>
          <div class="${gupRadioGroupClasses.options}">
            <label class="${GupRadioButton.getClassName()}">
              <input type="radio" class="${gupRadioClasses.input}" name="compare" value="a" checked />
              <div class="${gupRadioClasses.box}">
                <div class="${gupRadioClasses.boxInner}"><div class="${gupRadioClasses.pupil}"></div></div>
              </div>
              <div class="${gupRadioClasses.textContainer}">Option A</div>
            </label>
            <label class="${GupRadioButton.getClassName()}">
              <input type="radio" class="${gupRadioClasses.input}" name="compare" value="b" />
              <div class="${gupRadioClasses.box}">
                <div class="${gupRadioClasses.boxInner}"><div class="${gupRadioClasses.pupil}"></div></div>
              </div>
              <div class="${gupRadioClasses.textContainer}">Option B</div>
            </label>
          </div>
        </fieldset>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Web Component</h4>
        <gup-radio-button-group label="Web component group" name="compare-wc">
          <gup-radio-button name="compare-wc" value="a" selected>Option A</gup-radio-button>
          <gup-radio-button name="compare-wc" value="b">Option B</gup-radio-button>
        </gup-radio-button-group>
      </div>
    </div>
  `,
};
