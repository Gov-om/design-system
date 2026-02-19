import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../breadcrumbs/breadcrumbs/breadcrumbs';
import '../breadcrumbs/breadcrumbs-item/breadcrumbs-item';
import '../header/header';
import '../badge-chip/badge-chip';
import '../icon/icon';
import '../track/track';
import './content-header';
import { type ContentHeader } from './content-header';
import { html } from 'lit';
import { headerTemplate } from '../header/header.stories';

const { args, argTypes, template } = getWcStorybookHelpers('gup-content-header');
type Story = StoryObj<ContentHeader & typeof args>;

export default {
  title: 'Components/Layout/Content header',
  component: 'gup-content-header',
  args: {
    ...args,
    'page-title': 'Service name',
  },
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-header>
      ${headerTemplate}
    </gup-header>
    ${template(args)}
  `,
};

export const WithTitleAsSlot: Story = {
  ...Default,
  args: {
    'page-title-slot': '<gup-track gap="2"><gup-icon width="32" height="32" icon-name="receipt"></gup-icon> Some page title</gup-track>',
    'page-title': undefined,
  },
};

export const WithSubtitleAsProp: Story = {
  ...Default,
  args: {
    'page-subtitle': 'Service subtitle as a prop',
  },
};

export const WithSubtitleAsSlot: Story = {
  ...Default,
  args: {
    'page-subtitle-slot': '<gup-track gap="2"><gup-badge-chip is-filled appearance="neutral">Label</gup-badge-chip></gup-track>',
  },
};

export const WithPageSummary: Story = {
  render: (args) => html`
    <gup-header>
      ${headerTemplate}
    </gup-header>
    ${template(
      args,
      html`
        <div slot="page-summary">This is the page summary slot - Gov.om reference <strong>59393993</strong></div>
    `
    )}
  `,
};

export const WithDefaultSlot: Story = {
  render: (args) => html`
    <gup-header>
      ${headerTemplate}
    </gup-header>
    ${template(
      args,
      html`
      <p>Some content here</p>
      <p style="font-size: var(--gup-component-5);">Pound spite before research depth magic stop person unit walk porch sit rapidly graph gun thumb battle root horn into through similar let push</p>
    `
    )}
  `,
};

export const WithBreadcrumbs: Story = {
  render: (args) => html`
    <gup-header>
      ${headerTemplate}
    </gup-header>
    ${template(
      args,
      html`
      <gup-breadcrumbs slot="breadcrumbs">
        <gup-breadcrumbs-item href="https://google.com">Home</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="https://store.google.com">Store</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="https://store.google.com/us/category/phones">Category</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="https://store.google.com/us/product/pixel_8a">Phone</gup-breadcrumbs-item>
        <gup-breadcrumbs-item href="https://store.google.com/us/product/pixel_8a_specs" current>Phone specs</gup-breadcrumbs-item>
      </gup-breadcrumbs>
    `
    )}
  `,
};

export const WithAllSlots: Story = {
  render: (args) => html`
    <gup-header>
      ${headerTemplate}
    </gup-header>
    ${template(
      args,
      html`
      <span slot="page-subtitle">This is the page subtitle slot</span>
      <div slot="page-summary">This is the page summary slot - Gov.om reference <strong>59393993</strong></div>
      <p>This is the default slot - Some content here</p>
      <p style="font-size: var(--gup-component-5);">This is the default slot too - with custom font size applied. Pound spite before research depth magic stop person unit walk porch sit rapidly graph gun thumb battle root horn into through similar let push</p>
    `
    )}
  `,
};

export const WithCustomBackground: Story = {
  render: (args) => html`
    <gup-header>
      ${headerTemplate}
    </gup-header>
    ${template(args)}
  `,
  args: {
    '--gup-content-header--background': 'var(--gup-color-positive-xlow)',
  },
};
