import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './screenreader-text';
import { type ScreenreaderText } from './screenreader-text';
import { html } from 'lit';

const { args, argTypes, template } = getWcStorybookHelpers('gup-screenreader-text');
type Story = StoryObj<ScreenreaderText & typeof args>;

export default {
  title: 'Components/Screenreader text',
  component: 'gup-screenreader-text',
  args: {
    ...args,
    'default-slot': 'Screenreader text',
  },
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) => html`
    The text below is only visible to screenreaders: <br>
    ${template(args)}
    Did you see it?
  `,
};
