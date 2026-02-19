import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './toggle';
import { type Toggle } from './toggle';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-toggle');
type Story = StoryObj<Toggle & typeof args>;

export default {
  title: 'Components/Forms/Toggle',
  component: 'gup-toggle',
  args: {
    ...args,
    name: 'switch-input',
    'default-slot': 'Default',
  },
  argTypes,
  parameters: {
    actions: {
      handles: [...events, 'gup-change'],
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Checked: Story = {
  ...Default,
  args: {
    checked: true,
  },
};

export const KnobAfter: Story = {
  ...Default,
  args: {
    'knob-location': 'after',
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
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const WithHint: Story = {
  ...Default,
  args: {
    'default-slot': 'Custom Label',
    'hint-slot': 'Helper text is in here and it takes a lot of space and a lot of time to read properly in English language',
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'تبديل',
    'hint-slot': 'هذا هو نص التلميح لمساعدة المستخدم',
  },
  parameters: {
    direction: 'rtl',
  },
};
