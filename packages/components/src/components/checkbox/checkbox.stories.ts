import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import './checkbox';
import { type Checkbox } from './checkbox';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-checkbox');
type Story = StoryObj<Checkbox & typeof args>;

export default {
  title: 'Components/Forms/Checkbox',
  component: 'gup-checkbox',
  argTypes,
  args: {
    ...args,
    value: 'enabled',
    name: 'subscription',
    'default-slot': 'Checkbox label',
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Required: Story = {
  ...Default,
  args: {
    required: true,
  },
};

export const Small: Story = {
  ...Default,
  args: {
    size: 's',
    'hint-slot': 'Smaller checkbox appears when <code>size</code> property is set to <code>s</code>',
    'default-slot': 'Small',
  },
};

export const Circle: Story = {
  ...Default,
  args: {
    appearance: 'circle',
    'default-slot': 'Circle',
  },
};

export const Checked: Story = {
  ...Default,
  args: {
    checked: true,
    'default-slot': 'Checked',
  },
};

export const Indeterminate: Story = {
  ...Default,
  args: {
    indeterminate: true,
    'default-slot': 'Indeterminate',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
    'default-slot': 'Disabled',
  },
};

export const DisabledAndChecked: Story = {
  ...Default,
  args: {
    disabled: true,
    checked: true,
    'default-slot': 'Disabled and checked',
  },
};

export const WithHint: Story = {
  ...Default,
  args: {
    'hint-slot': 'This is helper text. Use it when you want to comminicate a message.',
    'default-slot': 'With hint',
  },
};

export const WithCustomHTMLInLabel: Story = {
  ...Default,
  render: (args) => template(args, html`Here goes <em>HTML</em> in the label`),
  args: {
    'default-slot': '',
  },
};

export const WithCustomHTMLInHint: Story = {
  ...Default,
  args: {
    'default-slot': 'Here goes something!',
    'hint-slot': 'Here goes a <strong>tip</strong> for ya!',
  },
};

export const InForm: Story = {
  ...Default,
  render: (args) => html`
    <form>
      ${template(args)}
      <button type="submit">Submit</button>
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
              console.log('component checked', element.checked);
              console.log('component value', element.value);
            }
          }
        });
      })();
    </script>
  `,
  args: {
    'default-slot': 'In form',
  },
};

export const WithErrorMessage: Story = {
  ...InForm,
  args: {
    'error-message': 'Please check the checkbox, or else...',
    'default-slot': 'With error message',
    required: true,
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

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'نص عربي',
  },
  parameters: {
    direction: 'rtl',
  },
};
