import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './spinner';
import { type Spinner } from './spinner';

const { argTypes, args, template } = getWcStorybookHelpers('gup-spinner');
type Story = StoryObj<Spinner & typeof args>;

export default {
  title: 'Components/Spinner',
  component: 'gup-spinner',
  argTypes,
  args,
  parameters: {
    layout: 'padded',
    // Disabling as the spinner is animated and triggers snapshot diffing every time
    chromatic: { disableSnapshot: true },
  },
  render: (args) => template(args),
} as Meta;

export const Default: Story = {};

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

export const ExtraLarge: Story = {
  ...Default,
  args: {
    size: 'xl',
  },
};

export const WithCustomStyle: Story = {
  ...Default,
  args: {
    '--gup-spinner--font-size': '23px',
    '--gup-spinner--size': '20px',
  },
};

export const WithScreenreaderOnlyLabel: Story = {
  ...Default,
  args: {
    'label-hidden': true,
  },
};
