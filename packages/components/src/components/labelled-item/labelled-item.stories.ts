import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './labelled-item';
import { type LabelledItem } from './labelled-item';

import '../icon/icon';

const { args, argTypes, template } = getWcStorybookHelpers('gup-labelled-item');
type Story = StoryObj<LabelledItem & typeof args>;

export default {
  title: 'Components/Labelled item',
  component: 'gup-labelled-item',
  args: {
    ...args,
    'default-slot': 'I am a labelled item',
    'label-slot': 'Label',
  },
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithContentIcon: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <gup-icon slot="icon" title="Icon" icon-name="receipt"></gup-icon>
        15 OMR went pie captured due source stand needed most get angry canal signal each silent have feet depth say work table paid biggest outer dozen
      `
    ),
  args: {
    'default-slot': '',
  },
};
