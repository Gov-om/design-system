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
          <gup-track vertical-alignment="center" gap="1"> 
            15 
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 729.6 365.93" width="20">
              <g id="RHhDp6">
                <path d="M241.67,213.77c-.63-49.2,11.44-95.41,35.76-137.75C313.47,13.28,353.02-6.48,421.55,28.87c10.67,5.5,53.6,35.43,57.81,44.54,5.03,10.87-27.48,103.87-29.11,122.3-34.69-37.51-99.37-98.66-154.85-69.62-45.05,23.58-12.02,62.54,11.46,87.68h409.36l-26.41,47.64h-332.5c-.31,1.8.87,3.3,2.53,4.6,12.44,9.72,80.97,39.54,94.75,39.54h210.71l-26.89,48.94H13.37l26.91-48.94h253.38l-37.11-44.13H64.75l26.41-47.64h150.51Z"/>
              </g>
            </svg>
          </gup-track>
        </gup-labelled-item>
      `
    ),
  args: {
    'default-slot': '',
  },
};

export const RTL: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-labelled-item>
          <span slot="label">الخدمة المختارة</span>
          اسم الخدمة
        </gup-labelled-item>
        <gup-labelled-item>
          <span slot="label">المبلغ المستحق</span>
          <gup-icon slot="icon" title="Icon" icon-name="receipt"></gup-icon>
          <gup-track vertical-alignment="center" gap="1">
            15
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 729.6 365.93" width="20">
              <g id="RHhDp6">
                <path d="M241.67,213.77c-.63-49.2,11.44-95.41,35.76-137.75C313.47,13.28,353.02-6.48,421.55,28.87c10.67,5.5,53.6,35.43,57.81,44.54,5.03,10.87-27.48,103.87-29.11,122.3-34.69-37.51-99.37-98.66-154.85-69.62-45.05,23.58-12.02,62.54,11.46,87.68h409.36l-26.41,47.64h-332.5c-.31,1.8.87,3.3,2.53,4.6,12.44,9.72,80.97,39.54,94.75,39.54h210.71l-26.89,48.94H13.37l26.91-48.94h253.38l-37.11-44.13H64.75l26.41-47.64h150.51Z"/>
              </g>
            </svg>
          </gup-track>
        </gup-labelled-item>
      `
    ),
  args: {
    'default-slot': '',
  },
  parameters: {
    direction: 'rtl',
  },
};
