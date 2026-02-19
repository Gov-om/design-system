import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './form-hint';
import { type FormHint } from './form-hint';

const { args, argTypes, template } = getWcStorybookHelpers('gup-form-hint');
type Story = StoryObj<FormHint & typeof args>;

export default {
  title: 'Components/Forms/Hint',
  component: 'gup-form-hint',
  args: {
    ...args,
    'default-slot': 'Usually this component is used internally by other form components. You will not encounter it in the wild often.',
  },
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};
