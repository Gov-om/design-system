import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './details';
import { type Details } from './details';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-details');
type Story = StoryObj<Details & typeof args>;

export default {
  title: 'Components/Details',
  component: 'gup-details',
  args: {
    ...args,
    'default-slot': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    'label-slot': 'I am a label for the button',
  },
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Open: Story = {
  ...Default,
  args: {
    open: true,
  },
};

export const WithCustomIcons: Story = {
  ...Default,
  args: {
    'closed-icon': 'add-circle',
    'open-icon': 'remove-circle',
  },
};

export const WithoutIcon: Story = {
  ...Default,
  args: {
    'icon-hidden': true,
    'label-slot': 'Click me to toggle the content',
  },
};

export const WithToggleButtonTooltip: Story = {
  ...Default,
  args: {
    'toggle-button-title': 'Click to toggle',
  },
};

export const WithContentAppearanceQuote: Story = {
  ...Open,
};

export const WithContentAppearanceSink: Story = {
  ...Open,
  args: {
    open: true,
    'content-appearance': 'sink',
  },
};

export const WithContentAppearanceNone: Story = {
  ...Open,
  args: {
    open: true,
    'content-appearance': 'none',
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'طبيعية ساحرة شمس على الجبال قمر على البحر نجوم راقصة نهر هادئ',
    'label-slot': 'اضغط',
  },
  parameters: {
    direction: 'rtl',
  },
};
