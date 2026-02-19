import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './search';
import { type Search } from './search';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-search');
type Story = StoryObj<Search & typeof args>;

export default {
  title: 'Components/Search',
  component: 'gup-search',
  args: {
    ...args,
    label: 'Search',
    name: 'search input',
    'search-label': 'Visually hidden label for search button',
    'reset-label': 'Visually hidden label for clear button',
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

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  ...Default,
  args: {
    placeholder: 'Search for something...',
  },
};

export const WithValue: Story = {
  ...Default,
  args: {
    value: 'what is the real meaning of life?',
  },
};

export const RTL: Story = {
  ...Default,
  parameters: {
    direction: 'rtl',
  },
};
