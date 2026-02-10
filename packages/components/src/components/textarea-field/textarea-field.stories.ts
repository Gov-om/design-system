import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import './textarea-field';
import { type TextareaField } from './textarea-field';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-textarea-field');
type Story = StoryObj<TextareaField & typeof args>;

export default {
  title: 'Components/Forms/Textarea field',
  component: 'gup-textarea-field',
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

export const Default: Story = {
  render: (args) => template(args),
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
              console.log('component value', element.value);
            }
          }
        });
      })();
    </script>
  `,
};

export const WithMaxCharLimit: Story = {
  ...Default,
  args: {
    maxlength: 10,
  },
};

export const Required: Story = {
  ...InForm,
  args: {
    required: true,
  },
};

export const WithCustomErrorMessage: Story = {
  ...InForm,
  args: {
    required: true,
    'error-message': 'Invalid!!!',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const WithValue: Story = {
  ...Default,
  args: {
    value: 'Some value',
  },
};

export const WithRows: Story = {
  ...Default,
  args: {
    rows: 10,
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
      'Wide aside special tight morning base right although dog imagine theory face audience wish broad known ability prevent characteristic song tube swim second just die subject quick bit other room fire count fur birth',
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
    'default-slot': 'اسم الحقل',
    'hint-slot': 'هذا عبارة عن نص لمساعدة المستخدم',
  },
  parameters: {
    direction: 'rtl',
  },
};
