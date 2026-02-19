import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './divider';
import { type Divider } from './divider';

const { args, argTypes, template } = getWcStorybookHelpers('gup-divider');
type Story = StoryObj<Divider & typeof args>;

export default {
  title: 'Components/Divider',
  component: 'gup-divider',
  args,
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
      <span>Element 1</span>
      <span>Element 2 with some word</span>
      <span>Element 3 with so many words that they talk from were split happened someone dead tide joy stranger air bark applied should thank if already where went waste slightly orange tent boy</span>
    `
    ),
};

export const Top: Story = {
  ...Default,
  args: {
    location: 'top',
    gap: 5,
  },
};

export const Both: Story = {
  ...Default,
  args: {
    location: 'top-and-bottom',
    gap: 6,
  },
};

export const Secondary: Story = {
  ...Default,
  args: {
    location: 'top-and-bottom',
    appearance: 'secondary',
    gap: 7,
  },
};

export const Inverse: Story = {
  ...Default,
  render: (args) => html`
    <style>body {color: white}</style>
    ${template(
      args,
      html`
      <span>Element 1</span>
      <span>Element 2 with some word</span>
      <span>Element 3 with so many words that they talk from were split happened someone dead tide joy stranger air bark applied should thank if already where went waste slightly orange tent boy</span>
    `
    )}
  `,
  args: {
    location: 'top-and-bottom',
    appearance: 'inverse',
    gap: 8,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
