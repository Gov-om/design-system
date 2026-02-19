import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './toast';
import { type Toast } from './toast';

// import '../../../../.storybook/components/storybook-comment/storybook-comment';

const { args, argTypes, template } = getWcStorybookHelpers('gup-toast');
type Story = StoryObj<Toast & typeof args>;

export default {
  title: 'Components/Toasts/Toast',
  component: 'gup-toast',
  args: {
    ...args,
    'default-slot':
      'This is a toast message slave desk north official prevent finish tightly mean suppose attack gravity breathing production was her test finally everybody',
  },
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
  ${template(args)}
  <!-- <storybook-comment>Use the <code>gup-toast-container</code> to dynamically add the toasts.</storybook-comment> -->
  `,
};

export const WithSeverityPositive: Story = {
  ...Default,
  args: {
    severity: 'positive',
  },
};

export const WithSeverityNegative: Story = {
  ...Default,
  args: {
    severity: 'negative',
  },
};

export const WithSeverityWarning: Story = {
  ...Default,
  args: {
    severity: 'warning',
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'هذه رسالة نخب',
  },
  parameters: {
    direction: 'rtl',
  },
};
