import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './data-sheet';
import { type DataSheet } from './data-sheet';

import '../icon/icon';
import '../labelled-item/labelled-item';

const { args, argTypes, template } = getWcStorybookHelpers('gup-data-sheet');
type Story = StoryObj<DataSheet & typeof args>;

export default {
  title: 'Components/Data sheet',
  component: 'gup-data-sheet',
  args: {
    ...args,
    'default-slot': 'Usually this component is used with labelled items, but it can be also used to highlight any other content.',
  },
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithLabelledItems: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-labelled-item>
          <span slot="label">Selected service</span>
          Service name
        </gup-labelled-item>
        <gup-labelled-item>
          <span slot="label">Amount to pay</span>
          <gup-icon slot="icon" title="Icon" icon-name="receipt"></gup-icon>
          15 OMR
        </gup-labelled-item>
      `
    ),
  args: {
    'default-slot': '',
  },
};
