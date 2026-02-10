import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import { applyBreakpoint } from '../../../.storybook/utils';

import './track';
import { type Track } from './track';

const { args, argTypes, template } = getWcStorybookHelpers('gup-track');
type Story = StoryObj<Track & typeof args>;

export default {
  title: 'Components/Track',
  component: 'gup-track',
  args,
  argTypes: {
    ...argTypes,
    gap: {
      control: {
        type: 'number',
      },
    },
  },
  parameters: {
    layout: 'padded',
  },
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

export const WithTrackElementsJustified: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <span>Element 1</span>
        <span>Element 2 with some word</span>
      `
    ),
  args: {
    'horizontal-alignment': 'justify',
  },
};

export const Mobile: Story = {
  ...Default,
  ...applyBreakpoint('xsmall'),
};
