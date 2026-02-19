import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import { applyBreakpoint } from '../../../../.storybook/utils';

import './breadcrumbs-item';
import '../breadcrumbs/breadcrumbs';
import { type BreadcrumbsItem } from './breadcrumbs-item';

const { template, args, argTypes } = getWcStorybookHelpers('gup-breadcrumbs-item');
type Story = StoryObj<BreadcrumbsItem & typeof args>;

export default {
  title: 'Components/Breadcrumbs/Breadcrumbs item',
  component: 'gup-breadcrumbs-item',
  args: {
    ...args,
    href: '#',
    'default-slot': 'I am a breadcrumbs item',
  },
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-breadcrumbs>
      ${template(args)}
      <gup-breadcrumbs-item href="#">Store</gup-breadcrumbs-item>
      <gup-breadcrumbs-item href="#">Category</gup-breadcrumbs-item>
      <gup-breadcrumbs-item href="#">Phone</gup-breadcrumbs-item>
      <gup-breadcrumbs-item href="#" current>Phone specs</gup-breadcrumbs-item>
    </gup-breadcrumbs>
  `,
};

export const WithTwoItems: Story = {
  ...Default,
  render: (args) => html`
    <gup-breadcrumbs>
      ${template(args)}
      <gup-breadcrumbs-item href="#" current>Settling in Oman</gup-breadcrumbs-item>
    </gup-breadcrumbs>
  `,
  args: {
    'default-slot': 'Representative of an Overseas Business visa',
  },
};

export const Mobile: Story = {
  ...Default,
  ...applyBreakpoint('xsmall'),
};

export const RTL: Story = {
  ...Default,
  render: (args) => html`
    <gup-breadcrumbs>
      ${template(args)}
      <gup-breadcrumbs-item href="#">الاستقرار في عمان</gup-breadcrumbs-item>
      <gup-breadcrumbs-item href="#" current>الجوازات والسفر والإقامة في الخارج</gup-breadcrumbs-item>
    </gup-breadcrumbs>
  `,
  args: {
    'default-slot': 'تأشيرة ممثل لشركة أجنبية',
  },
  parameters: {
    // Won't apply in Chromatic. See https://github.com/literalpie/storybook-addon-rtl/issues/13
    direction: 'rtl',
  },
};
