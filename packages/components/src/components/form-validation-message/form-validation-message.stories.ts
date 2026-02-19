import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './form-validation-message';
import { type FormValidationMessage } from './form-validation-message';

const { args, argTypes, template } = getWcStorybookHelpers('gup-form-validation-message');
type Story = StoryObj<FormValidationMessage & typeof args>;

export default {
  title: 'Components/Forms/Validation message',
  component: 'gup-form-validation-message',
  args: {
    ...args,
    'default-slot':
      'Usually this component is used internally by other form components. You will not encounter it in the wild often. dress spend kill wrapped breeze rays jet hunt private blow forty very aside species body discussion getting horse atom weather act weak cool unusual',
  },
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};
