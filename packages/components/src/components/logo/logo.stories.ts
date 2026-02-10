import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './logo';
import { type Logo } from './logo';

const { argTypes, args, template } = getWcStorybookHelpers('gup-logo');
type Story = StoryObj<Logo & typeof args>;

export default {
  title: 'Components/Logo',
  component: 'gup-logo',
  argTypes,
  args: {
    ...args,
    size: 120,
  },
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const VerticalLogo: Story = {
  ...Default,
  args: {
    appearance: 'vertical',
  },
};

export const HorizontalLogo: Story = {
  ...Default,
  args: {
    appearance: 'horizontal',
  },
};

export const InvertedIcon: Story = {
  ...Default,
  args: {
    inverted: 'enabled',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const InvertedVerticalLogo: Story = {
  ...Default,
  args: {
    inverted: 'enabled',
    appearance: 'vertical',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const InvertedHorizontalLogo: Story = {
  ...Default,
  args: {
    inverted: 'enabled',
    appearance: 'horizontal',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const LogoWithLink: Story = {
  ...Default,
  args: {
    href: 'https://google.com',
  },
};

export const LogoWithCustomColor: Story = {
  ...Default,
  args: {
    inverted: 'custom',
    '--gup-logo--color': '#ff0000',
  },
};
