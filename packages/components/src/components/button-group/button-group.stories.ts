import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './button-group';
import '../button/button';
import { type ButtonGroup } from './button-group';

const { args, argTypes, template } = getWcStorybookHelpers('gup-button-group');
type Story = StoryObj<ButtonGroup & typeof args>;

export default {
  title: 'Components/Button group',
  component: 'gup-button-group',
  args,
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-button>Button 1</gup-button>
        <gup-button>Some other button 2</gup-button>
      `
    ),
};
