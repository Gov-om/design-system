import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './page-status';
import { type PageStatus } from './page-status';
import '../icon/icon';
import '../button/button';

const { args, argTypes, template } = getWcStorybookHelpers('gup-page-status');
type Story = StoryObj<PageStatus & typeof args>;

export default {
  title: 'Components/Page status',
  component: 'gup-page-status',
  args: {
    ...args,
    'default-slot':
      'Some body text bill original spread fallen exclaimed zoo machinery zero discuss lungs butter her box moving teacher herself simply team slave not run can got drew',
    'title-slot': 'A title perfectly headed party research army tent rubber third welcome',
  },
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-button slot="action">Action button</gup-button>
      `
    ),
};

export const TypeSuccess: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
          <gup-button slot="action">Review your application</gup-button>
      `
    ),
  args: {
    'default-slot': 'Payment ID: 22399',
    'title-slot': 'Your payment has been processed successfully.',
  },
};

export const TypeError: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <gup-button slot="action">Update payment method</gup-button>
      `
    ),
  args: {
    type: 'error',
    'default-slot': 'We tried to charge your card, but something went wrong. Please update your payment method below to continue.',
    'title-slot': 'Your payment has failed.',
  },
};

export const TypeExpired: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <gup-button slot="action">Go to dashboard</gup-button>
      `
    ),
  args: {
    type: 'expired',
    'default-slot':
      'Unfortunately, the payment period has ended. You will need to start a new application. Please exit and submit a new application to proceed.',
    'title-slot': 'Your application has expired.',
  },
};
