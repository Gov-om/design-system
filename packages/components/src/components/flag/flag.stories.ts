import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { countriesList } from '../../../.storybook/utils';

import './flag';
import '../track/track';
import { type Flag } from './flag';
import { html } from 'lit';

const { args, argTypes, template } = getWcStorybookHelpers('gup-flag');
type Story = StoryObj<Flag & typeof args>;

export default {
  title: 'Components/Flag',
  component: 'gup-flag',
  argTypes: {
    ...argTypes,
    'country-name': {
      control: { type: 'select' },
      options: countriesList,
    },
  },
  args: {
    ...args,
    'country-name': 'om',
  },
  parameters: {
    axe: {
      // Some of the flags contain aria-label and that triggers an axe warning
      disabledRules: ['aria-prohibited-attr'],
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Circle: Story = {
  ...Default,
  args: {
    shape: 'circle',
    'country-name': 'switzerland',
  },
};

export const CustomSize: Story = {
  ...Default,
  args: {
    shape: 'rectangle',
    size: 50,
    'country-name': 'San Marino',
  },
};

export const AllFlags: Story = {
  render: (args) => html`
    <gup-track gap="3" is-multiline>
      ${countriesList.map(
        (country) => html`
          <gup-flag country-name=${country} size=${args.size} shape=${args.shape}></gup-flag>
        `
      )}
    </gup-track>
  `,
  argTypes: {
    'country-name': {
      control: {
        disable: true,
      },
    },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
