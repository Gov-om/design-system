import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './link';
import { type Link } from './link';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-link');
type Story = StoryObj<Link & typeof args>;

export default {
  title: 'Components/Link',
  component: 'gup-link',
  args: {
    ...args,
    href: '#',
    'default-slot': 'I am a link',
  },
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Secondary: Story = {
  ...Default,
  args: {
    severity: 'secondary',
  },
};

export const Danger: Story = {
  ...Default,
  args: {
    severity: 'danger',
  },
};

export const Button: Story = {
  ...Default,
  args: {
    kind: 'button',
  },
};

export const Small: Story = {
  ...Default,
  args: {
    size: 's',
  },
};

export const Large: Story = {
  ...Default,
  args: {
    size: 'l',
  },
};

export const Disabled: Story = {
  ...Button,
  args: {
    ...Button.args,
    disabled: true,
  },
};

export const LinkOpeningInNewTab: Story = {
  ...Default,
  args: {
    'open-in-new-tab': true,
    'default-slot': 'I am a link that opens in a new tab',
  },
};
