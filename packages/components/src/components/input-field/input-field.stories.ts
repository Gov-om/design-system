import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import './input-field';
import { type InputField } from './input-field';
import '../track/track';
import '../wizard-main/wizard-main';
// import '../../../.storybook/components/storybook-comment/storybook-comment';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-input-field');
type Story = StoryObj<InputField & typeof args>;

export default {
  title: 'Components/Forms/Input field',
  component: 'gup-input-field',
  argTypes,
  args: {
    ...args,
    value: '',
    name: 'your-message',
    'default-slot': 'Your message',
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
  },
} as Meta;

const formTemplate = (args: InputField & { 'data-story-id'?: string }, slotTemplate = html``) => html`
  <form novalidate>
  ${template(args, slotTemplate)}
  <button type="submit" style="margin-top: 12px;">Submit</button>
  </form>
  <script>
    (function() {
      const storyRoot = document.getElementById('${args['data-story-id']}');
      storyRoot.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(Object.fromEntries(formData), 'form data');
        for (const element of event.target.elements) {
          if (element.nodeName !== 'BUTTON') {
            console.log('component name', element.name);
            console.log('component value', element.value);
          }
        }
      });
    })();
  </script>
`;

export const Default: Story = {
  render: (args) => template(args),
};

export const InForm: Story = {
  ...Default,
  render: (args) => html`
    <!-- <storybook-comment>
      The <code>novalidate</code> attribute can be added to the form to disable the default behavior of focusing on invalid input and displaying a native error message, allowing for custom error handling.
    </storybook-comment> -->
    ${formTemplate(args)}
  `,
};

export const NumericField: Story = {
  ...Default,
  render: (args) => html`
    <!-- <storybook-comment>Numeric field uses a pattern of <code>[0-9]*</code> by default. <br>Note that it doesn't prevent user from entering non-digit characters.</storybook-comment> -->
    ${template(args)}
  `,
  args: {
    type: 'numeric',
    'default-slot': 'Your numeric value',
  },
};

export const NumericFieldWithCustomPattern: Story = {
  ...Default,
  render: (args) => html`
    <!-- <storybook-comment>It is possible to apply a custom <code>pattern</code> for a numeric field. This one uses a PIN-like pattern instead of the default one.</storybook-comment> -->
    ${template(args)}
  `,
  args: {
    type: 'numeric',
    'default-slot': 'Enter your 4-digit PIN',
    pattern: '\\d{4,4}',
  },
};

export const NumberField: Story = {
  ...Default,
  args: {
    type: 'number',
    'default-slot': 'Your age',
  },
  argTypes: {
    'min': {
      control: {
        type: 'number',
      },
    },
    'max': {
      control: {
        type: 'number',
      },
    },
  },
};

export const NumberFieldWithCustomIncrements: Story = {
  ...NumberField,
  args: {
    type: 'number',
    step: 2,
    min: 4,
    max: 104,
    placeholder: '4 to 104 in steps of 2',
    'default-slot': 'Custom increments',
  },
};

export const NumericFieldAndNumberFieldComparison: Story = {
  ...NumberField,
  render: (args) => html`
    <!-- <storybook-comment>
      <p>A component with <code>type="numeric"</code> allows any keyboard input (displaying an error with the default pattern settings set to numbers only) and displays a number-friendly keyboard on mobile devices. A component with <code>type="number"</code> only allows number input and displays arrow buttons at the end of the input. </p>
      <p>Use <code>type="numeric"</code> for non-incremental numerical values such as Civil ID, PINs, etc. Use <code>type="number"</code> for incremental number values such as age. </p>
    </storybook-comment> -->
    <gup-track gap="5" direction="vertical">
      <gup-input-field type="numeric" name="numeric">Enter your 4-digit PIN (numeric field)</gup-input-field>
      ${template(args)}
    </gup-track>
  `,
  args: {
    ...NumberField.args,
    'default-slot': 'Your age (number field)',
  },
};

export const EmailField: Story = {
  ...Default,
  args: {
    type: 'email',
    'default-slot': 'Your email',
  },
};

export const PhoneField: Story = {
  render: (args) => html`
    <!-- <storybook-comment>
      Note that phone number is not validated by default. However, we can use <code>pattern</code> prop to enforce a country-specific format.
    </storybook-comment> -->
    ${template(args)}
  `,
  args: {
    type: 'tel',
    placeholder: '+96812345678',
    pattern: '\\+968[0-9]{8}',
    'default-slot': 'Your phone number',
  },
};

export const URLField: Story = {
  ...Default,
  args: {
    type: 'url',
    'default-slot': 'Your website',
  },
};

export const DateField: Story = {
  ...Default,
  render: (args) => html`
    ${template(args)}
    <!-- <storybook-comment>The date type relies on browser implementation of <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date" target="_blank"><code>input type=date</code></a>. Some datepicker features not available natively in browsers might not be supported by the component (eg. disabling non-contiguous date ranges).</storybook-comment> -->
  `,
  args: {
    type: 'date',
    'default-slot': 'Your birthdate',
  },
  argTypes: {
    'min': {
      control: {
        type: 'text',
      },
    },
    'max': {
      control: {
        type: 'text',
      },
    },
  },
};

export const DateFieldWithMinMaxDates: Story = {
  ...DateField,
  args: {
    ...DateField.args,
    min: '2024-01-01',
    max: '2024-06-01',
  },
};

export const TimeField: Story = {
  ...Default,
  args: {
    type: 'time',
    'default-slot': 'Select time',
  },
};

export const PasswordField: Story = {
  ...Default,
  args: {
    type: 'password',
    'default-slot': 'Your password',
  },
};

export const WithMaxCharLimit: Story = {
  ...Default,
  args: {
    maxlength: 10,
  },
};

export const WithPrefix: Story = {
  render: (args) =>
    template(
      args,
      html`
        <div slot="prefix">Prefix</div>
      `
    ),
};

export const WithSuffix: Story = {
  render: (args) =>
    template(
      args,
      html`
        <div slot="suffix">Suffix</div>
      `
    ),
};

export const WithPrefixAndSuffix: Story = {
  render: (args) =>
    template(
      args,
      html`
        <div slot="prefix">Prefix</div>
        <div slot="suffix">Suffix</div>
      `
    ),
};

export const WithInputStart: Story = {
  render: (args) =>
    template(
      args,
      html`
        <button slot="input-start" aria-label="Some label for the button">
          <gup-icon icon-name="refresh" width="24" height="24"></gup-icon>
        </button>
      `
    ),
};

export const WithInputEnd: Story = {
  render: (args) =>
    template(
      args,
      html`
        <button slot="input-end" aria-label="Some label for the button">
          <gup-icon icon-name="keyboard-arrow-down" height="24" width="24"></gup-icon>
        </button>
      `
    ),
};

export const WithInputStartAndEnd: Story = {
  render: (args) =>
    template(
      args,
      html`
        <button slot="input-start" aria-label="Some label for the button">
          <gup-icon icon-name="refresh" height="24" width="24"></gup-icon>
        </button>
        <button slot="input-end" aria-label="Some label for the button">
          <gup-icon icon-name="keyboard-arrow-down" height="24" width="24"></gup-icon>
        </button>
      `
    ),
};

export const WithAllSlotsOccupied: Story = {
  render: (args) =>
    template(
      args,
      html`
        <div slot="prefix">Prefix</div>
        <div slot="suffix">Suffix</div>
        <button slot="input-start" aria-label="Some label for the button">
          <gup-icon icon-name="refresh" height="24" width="24"></gup-icon>
        </button>
        <button slot="input-end" aria-label="Some label for the button">
          <gup-icon icon-name="keyboard-arrow-down" height="24" width="24"></gup-icon>
        </button>
      `
    ),
};

export const Required: Story = {
  ...InForm,
  args: {
    required: true,
  },
};

// start-input slot should be ignored when state is invalid
export const RequiredWithInputStart: Story = {
  ...Default,
  render: (args) =>
    formTemplate(
      args,
      html`
        <button slot="input-start" aria-label="Some label for the button">
          <gup-icon icon-name="refresh" width="24" height="24"></gup-icon>
        </button>
      `
    ),
  args: {
    required: true,
  },
};

// start-input slot should be ignored when state is invalid or type is date or time etc.
export const RequiredTimeWithInputStart: Story = {
  ...Default,
  render: (args) =>
    formTemplate(
      args,
      html`
        <button slot="input-start" aria-label="Some label for the button">
          <gup-icon icon-name="refresh" width="24" height="24"></gup-icon>
        </button>
      `
    ),
  args: {
    required: true,
    type: 'time',
  },
};

export const WithCustomValidationText: Story = {
  ...InForm,
  args: {
    required: true,
    'error-message':
      'Invalid!!! Please enter a valid message. It should be at least 10 characters long. It should not exceed 100 characters. It should not contain any special characters. It should not contain any numbers. It should not contain any emojis. It should not contain any URLs. Please be polite.',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const DisabledDateField: Story = {
  ...Default,
  args: {
    disabled: true,
    type: 'date',
  },
};

export const DisabledPasswordField: Story = {
  ...Default,
  args: {
    disabled: true,
    type: 'password',
  },
};

export const WithValue: Story = {
  ...Default,
  args: {
    value: 'Some value',
  },
};

export const WithValueReadonly: Story = {
  ...Default,
  args: {
    value: 'Some value',
    readonly: true,
  },
};

export const WithPlaceholder: Story = {
  ...Default,
  args: {
    placeholder: 'Some placeholder',
  },
};

export const WithHintText: Story = {
  ...Default,
  args: {
    'hint-slot':
      'Wide <strong>aside special</strong> tight morning base right although dog imagine theory face audience wish broad known ability prevent characteristic song tube swim second just die subject quick bit other room fire count fur birth',
  },
};

export const CivilID: Story = {
  ...Default,
  args: {
    'default-slot': 'Civil ID Number',
    'hint-slot': 'Enter the number as shown on your ID card',
  },
};

export const OnDarkerBackground: Story = {
  ...Default,
  parameters: {
    backgrounds: {
      default: 'GUP',
    },
  },
};

export const InsideComponentWithDifferentBackgroundColor: Story = {
  ...Default,
  render: (args) => html`
    <gup-wizard-main>
      ${template(
        args,
        html`
        <div slot="prefix">Prefix</div>
        <div slot="suffix">Suffix</div>
        <button slot="input-start" aria-label="Some label for the button">
          <gup-icon icon-name="refresh" height="24" width="24"></gup-icon>
        </button>
        <button slot="input-end" aria-label="Some label for the button">
          <gup-icon icon-name="keyboard-arrow-down" height="24" width="24"></gup-icon>
        </button>
      `
      )}
    </gup-wizard-main>
  `,
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'اسم الحقل',
    'hint-slot': 'نص لمساعدة المستخدمين على ملء الحقل',
  },
  parameters: {
    direction: 'rtl',
  },
};
