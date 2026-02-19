import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './radio-button';
import '../radio-button-group/radio-button-group';
import { type RadioButton } from './radio-button';
import { html } from 'lit';

const { argTypes, args, template, events } = getWcStorybookHelpers('gup-radio-button');
type Story = StoryObj<RadioButton & typeof args>;

export default {
  title: 'Components/Forms/Radio buttons/Radio button',
  component: 'gup-radio-button',
  argTypes,
  args: {
    ...args,
    'default-slot': 'Radio 1',
    name: 'radios',
    value: 'radio-1',
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-radio-button-group label="Radio button group with many items" name="radios">
      ${template(args)}
      ${template({ ...args, 'default-slot': 'Radio 2', value: 'radio-2', disabled: false, selected: false, 'hint-slot': '' })}
    </gup-radio-button-group>
  `,
  args: {
    'hint-slot': 'Note that <code>gup-radio-button</code> must be wrapped in <code>gup-radio-button-group</code> to work properly.',
  },
};

export const Selected: Story = {
  render: (args) => template(args),
  args: {
    'default-slot': 'Selected',
    selected: true,
    'hint-slot':
      'In <code>gup-radio-button-group</code> an item is selected if its value is the same as the group value. However, the checked state can be set directly by the selected property.',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const Small: Story = {
  ...Default,
  args: {
    size: 's',
  },
};

export const WithHint: Story = {
  ...Default,
  args: {
    'hint-slot': 'This is a hint text to help user.',
  },
};

export const WithCustomHTMLInLabel: Story = {
  ...Default,
  args: {
    'default-slot': 'This is a label with some <em>custom HTML</em>.',
  },
};

export const RTL: Story = {
  args: {
    'default-slot': 'راديو',
  },
  parameters: {
    direction: 'rtl',
  },
  render: (args) => template(args),
};
