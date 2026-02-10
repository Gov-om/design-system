import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../icon/icon';
import '../button/button';
import './wizard-footer';
import { type WizardFooter } from './wizard-footer';

const { args, argTypes, template } = getWcStorybookHelpers('gup-wizard-footer');
type Story = StoryObj<WizardFooter & typeof args>;

export default {
  title: 'Components/Layout/Wizard footer',
  component: 'gup-wizard-footer',
  args: {
    ...args,
    'nav-aria-label': 'Service Navigation Footer',
  },
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
      <gup-button slot="start" appearance="secondary">
        Back
        <gup-icon slot="icon-start" icon-name="arrow-back" height="24" width="24"></gup-icon>
      </gup-button>
      <div slot="end">
        <gup-button appearance="danger">
          Delete
        </gup-button>
        <gup-button appearance="primary">
          Continue
          <gup-icon slot="icon-end" icon-name="arrow-forward" height="24" width="24"></gup-icon>
        </gup-button>
      </div>
      `
    ),
};

export const WithSingleItem: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-button appearance="primary" slot="end">
          Continue
          <gup-icon slot="icon-end" icon-name="arrow-forward" height="24" width="24"></gup-icon>
        </gup-button>
      `
    ),
};
