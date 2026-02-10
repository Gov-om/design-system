import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './form-section';
import '../button-group/button-group';
import '../button/button';
import '../table/table/table';
import '../table/table-row/table-row';
import '../table/table-cell/table-cell';
import { type FormSection } from './form-section';
import { html } from 'lit';

const { args, argTypes, template } = getWcStorybookHelpers('gup-form-section');
type Story = StoryObj<FormSection & typeof args>;

export default {
  title: 'Components/Form section',
  component: 'gup-form-section',
  argTypes,
  args: {
    ...args,
    'default-slot':
      'Tell her you just want to talk. It has nothing to do with mating. Ah, the Breakfast Club soundtrack! File not found. I was having the most wonderful dream. Except you were there, and you were there, and you were there, and you were there, and you were there, and you were there! Bender! Ship!',
    'title-slot': 'Section 1 saw refused would step wall gently handle hair various welcome manufacturing',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithFooter: Story = {
  ...Default,
  args: {
    'footer-slot': `
      <gup-button-group>
        <gup-button>Button 1</gup-button>
        <gup-button>Some other button 2</gup-button>
      </gup-button-group>`,
  },
};

export const MultipleFormSections: Story = {
  ...WithFooter,
  render: (args) =>
    html`
    ${template(args)}
    <gup-form-section>
      <div slot="title">Section 2</div>
      <gup-table>
        <gup-table-row>
          <gup-table-cell type="rowheader">Row 1</gup-table-cell>
          <gup-table-cell>Data 2 because do model represent actually driving observe troops bit furniture failed sure desk rise greatest review mirror finest mathematics locate dried native drawn believed</gup-table-cell>
          <gup-table-cell>Data 1</gup-table-cell>
        </gup-table-row>
        <gup-table-row>
          <gup-table-cell type="rowheader">Row 2</gup-table-cell>
          <gup-table-cell>Data 5 show fifty visitor shaking recall help reason evening nature hit on information couple free write active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</gup-table-cell>
          <gup-table-cell>Data 2</gup-table-cell>
        </gup-table-row>
        <gup-table-row>
          <gup-table-cell type="rowheader">Row 3</gup-table-cell>
          <gup-table-cell>Active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</gup-table-cell>
          <gup-table-cell>Data 3</gup-table-cell>
        </gup-table-row>
      </gup-table>
    </gup-form-section>
  `,
};
