import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import { applyBreakpoint } from '../../../../.storybook/utils';

import './breadcrumbs';
import '../breadcrumbs-item/breadcrumbs-item';
import { type Breadcrumbs } from './breadcrumbs';

const { template, args, argTypes } = getWcStorybookHelpers('gup-breadcrumbs');
type Story = StoryObj<Breadcrumbs & typeof args>;

export default {
  title: 'Components/Breadcrumbs/Breadcrumbs',
  component: 'gup-breadcrumbs',
  args,
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-breadcrumbs-item href="#">Home</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="#">Store</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="#">Category</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="#">Phone</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="#" current>Phone specs</gup-breadcrumbs-item>
      `
    )}
  `,
};

export const Mobile: Story = {
  ...Default,
  ...applyBreakpoint('xsmall'),
};

export const RTL: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-breadcrumbs-item href="#">الصفحة الرئيسية</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="#">هذه الصفحة</gup-breadcrumbs-item>
      `
    )}
  `,
  parameters: {
    direction: 'rtl',
  },
};
