import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './skip-link';
import { type SkipLink } from './skip-link';
import { html } from 'lit';

const { args, argTypes, template } = getWcStorybookHelpers('gup-skip-link');
type Story = StoryObj<SkipLink & typeof args>;

export default {
  title: 'Components/Skip link',
  component: 'gup-skip-link',
  tags: ['DEPRECATED'],
  args: {
    ...args,
    href: '#main-content',
    'default-slot': 'Skip to content',
  },
  argTypes,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '300px',
      },
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    ${template(args)}
    Press Tab, and the link will appear
  `,
};
