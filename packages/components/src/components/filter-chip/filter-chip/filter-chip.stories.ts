import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './filter-chip';

import { type FilterChip } from './filter-chip';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-filter-chip');
type Story = StoryObj<FilterChip & typeof args>;

export default {
  title: 'Components/Filter chip/Filter chip',
  component: 'gup-filter-chip',
  args: {
    ...args,
    'default-slot': 'I am a button',
  },
  argTypes: {
    ...argTypes,
    href: {
      ...argTypes.href,
      if: {
        arg: 'kind',
        eq: 'link',
      },
    },
    disabled: {
      ...argTypes.disabled,
      if: {
        arg: 'kind',
        eq: 'button',
      },
    },
    'hide-close-icon': {
      ...argTypes['hide-close-icon'],
      if: {
        arg: 'kind',
        eq: 'button',
      },
    },
  },
  parameters: {
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const Link: Story = {
  render: (args) => template(args),
  args: {
    kind: 'link',
    href: '#',
  },
};

export const WithoutCloseIcon: Story = {
  ...Default,
  args: {
    'hide-close-icon': true,
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'اضغط',
  },
  parameters: {
    direction: 'rtl',
  },
};
