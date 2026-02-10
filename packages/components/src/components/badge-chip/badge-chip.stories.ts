import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './badge-chip';
import { type BadgeChip } from './badge-chip';
import { html } from 'lit';

const { args, argTypes, template } = getWcStorybookHelpers('gup-badge-chip');
type Story = StoryObj<BadgeChip & typeof args>;

import '../track/track';
import '../icon/icon';
import '../avatar/avatar';
// import '../../../.storybook/components/storybook-comment/storybook-comment';

export default {
  title: 'Components/Badge chip',
  component: 'gup-badge-chip',
  args: {
    ...args,
    'default-slot': 'I am a label, play with me',
  },
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-track>
    ${template(args)}
    ${template({ ...args, 'is-filled': 'true', 'default-slot': 'Label 2' })}
    </gup-track>
    <!-- <storybook-comment>
      Avoid using too much text in a badge chip. If you need to display a status with more than 10-15 characters, consider adding it inline without a component.
    </storybook-comment> -->
  `,
};

export const WithTooMuchText: Story = {
  ...Default,
  args: {
    'default-slot':
      'I asked you to know that Fry death took only fifteen seconds, yet the pain was so intense, that it felt to him like fifteen years. And it goes without saying, it caused him to empty his bowels',
  },
};

export const Positive: Story = {
  ...Default,
  args: {
    appearance: 'positive',
  },
};

export const Warning: Story = {
  ...Default,
  args: {
    appearance: 'warning',
  },
};

export const Negative: Story = {
  ...Default,
  args: {
    appearance: 'negative',
  },
};

export const Brand: Story = {
  ...Default,
  args: {
    appearance: 'brand',
  },
};

export const WithThumbnail: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
      <gup-avatar slot="thumbnail" label="Angelo Badalamenti"></gup-avatar>
      `
    ),
};

export const WithIcons: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
      <gup-icon slot="prefix" icon-name="check" width="24" height="24" ></gup-icon>
      <gup-icon slot="suffix" icon-name="close" width="24" height="24"></gup-icon>
      `
    ),
};

export const IconOnly: Story = {
  ...Default,
  render: (args) =>
    template(
      { ...args, 'default-slot': '' },
      html`
      <gup-icon icon-name="contrast" width="16" height="16"></gup-icon>
      `
    ),
  args: {
    'with-icon-only': true,
  },
};
