import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import { applyBreakpoint } from '../../../../.storybook/utils';

import './filter-chip-wrapper';
import '../filter-chip/filter-chip';
import '../../button/button';
import '../../icon/icon';

import { type FilterChipWrapper } from './filter-chip-wrapper';

const { args, argTypes, template } = getWcStorybookHelpers('gup-filter-chip-wrapper');
type Story = StoryObj<FilterChipWrapper & typeof args>;

export default {
  title: 'Components/Filter chip/Filter chip wrapper',
  component: 'gup-filter-chip-wrapper',
  argTypes,
  args: {
    ...args,
    'label-slot': 'Search in:',
    'clear-label': 'Clear all',
  },
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-filter-chip>Filter 1</gup-filter-chip>
        <gup-filter-chip>Filter 2</gup-filter-chip>
        <gup-filter-chip>Filter 3</gup-filter-chip>
        <gup-filter-chip>Filter 4</gup-filter-chip>
      `
    ),
};

export const Mobile: Story = {
  ...Default,
  ...applyBreakpoint('xsmall'),
};

export const RTL: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-filter-chip>الفرز الأول</gup-filter-chip>
        <gup-filter-chip>الفرز الثاني</gup-filter-chip>
        <gup-filter-chip>الفرز الثالث</gup-filter-chip>
        <gup-filter-chip>الفرز الرابع</gup-filter-chip>
      `
    ),
  args: {
    ...args,
    'label-slot': 'البحث في:',
    'clear-label': 'مسح الكل',
  },
  parameters: {
    direction: 'rtl',
  },
};
