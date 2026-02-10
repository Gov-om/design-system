import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './callout';
import { type Callout } from './callout';
import { applyBreakpoint } from '../../../.storybook/utils';

const { args, argTypes, template } = getWcStorybookHelpers('gup-callout');
type Story = StoryObj<Callout & typeof args>;

export default {
  title: 'Components/Callout',
  component: 'gup-callout',
  args: {
    ...args,
    'default-slot': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    'title-slot': 'Quote title',
    'footer-slot': '- Author',
  },
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithBackground: Story = {
  ...Default,
  args: {
    appearance: 'background',
  },
};

export const WithBorder: Story = {
  ...Default,
  args: {
    appearance: 'border',
  },
};

export const WithoutTitle: Story = {
  ...Default,
  args: {
    'title-slot': '',
  },
};

export const WithoutFooter: Story = {
  ...Default,
  args: {
    'footer-slot': '',
  },
};

export const WithoutFooterAndTitle: Story = {
  ...Default,
  args: {
    'title-slot': '',
    'footer-slot': '',
  },
};

export const WithLongTitle: Story = {
  ...Default,
  args: {
    'title-slot': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  ...applyBreakpoint('xsmall'),
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'ولكن هل يمكن أن يكون هناك تعريف للعادي لا يعادله العادي أو الباهت؟ أو الذي لا يكون قسريًا أو مبالغًا فيه أو مبالغًا فيه؟',
    'title-slot': 'العادي هو تجميل الجنون العادي - اسأل سريالي',
    'footer-slot': '- الكاتب',
  },
  parameters: {
    direction: 'rtl',
  },
};
