import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './wizard-main';
import { type WizardMain } from './wizard-main';

const { args, argTypes, template } = getWcStorybookHelpers('gup-wizard-main');
type Story = StoryObj<WizardMain & typeof args>;

export default {
  title: 'Components/Layout/Wizard main',
  component: 'gup-wizard-main',
  args: {
    ...args,
    'default-slot':
      'Before you start, make sure you have your civil ID number and a recent passport-size photo ready. You will be asked for your personal details, your contact information and the documents this service requires. Your progress is saved after each step, so you can leave and come back to finish your application at any time within 30 days. Check your answers carefully before you continue. Once you submit the application you will not be able to change it, and you will receive a reference number by SMS and email that you can use to track its status.',
  },
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};
