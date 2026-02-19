import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './badge';
import { type Badge } from './badge';

const { args, argTypes, template } = getWcStorybookHelpers('gup-badge');
type Story = StoryObj<Badge & typeof args>;

export default {
  title: 'Components/Badge',
  component: 'gup-badge',
  args: {
    ...args,
    type: 'neutral',
  },
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Positive: Story = {
  ...Default,
  args: {
    type: 'positive',
  },
};

export const Negative: Story = {
  ...Default,
  args: {
    type: 'negative',
  },
};

export const Offline: Story = {
  ...Default,
  args: {
    type: 'offline',
  },
};
