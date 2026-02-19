import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './pagination';
import { type Pagination } from './pagination';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-pagination');
type Story = StoryObj<Pagination & typeof args>;

export default {
  title: 'Components/Pagination',
  component: 'gup-pagination',
  argTypes,
  args: {
    ...args,
    'total-pages': 25,
    'current-page': 6,
    'prev-label': 'Previous',
    'prev-title': 'Rub your eyes and purify your heart – and prize above all else in the world those who love you and who wish you well',
    'prev-link': '#',
    'next-title': 'But Art is a punitive sentence, not a birthright',
    'next-label': 'Next',
    'next-link': '#',
  },
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

export const Directional: Story = {
  ...Default,
  args: {
    kind: 'directional',
  },
};

export const DirectionalPrevious: Story = {
  ...Default,
  args: {
    kind: 'directional',
    'next-title': '',
    'next-label': '',
    'next-link': '',
  },
};

export const DirectionalNext: Story = {
  ...Default,
  args: {
    kind: 'directional',
    'prev-title': '',
    'prev-label': '',
    'prev-link': '',
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    'prev-label': 'السابق',
    'next-label': 'التالي',
  },
  parameters: {
    direction: 'rtl',
  },
};
