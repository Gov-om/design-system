import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import '../input-field/input-field';
import '../textarea-field/textarea-field';
import '../toggle/toggle';
import '../radio-button-group/radio-button-group';
import '../radio-button/radio-button';
import '../file-upload/file-upload';
import '../checkbox/checkbox';

import './form-list';
import { type FormList } from './form-list';

const { args, argTypes, template } = getWcStorybookHelpers('gup-form-list');
type Story = StoryObj<FormList & typeof args>;

export default {
  title: 'Components/Forms/Form list',
  component: 'gup-form-list',
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
  },
  args,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-input-field name="your-first-name">Your first name</gup-input-field>
        <gup-input-field name="your-last-name">Your last name</gup-input-field>
        <gup-textarea-field name="your-message" rows="4">Your message</gup-textarea-field>
        <gup-toggle name="switch-input">Default</gup-toggle>
        <gup-radio-button-group label="Radio button group with many items" name="radios">
          <gup-radio-button name="radios" value="radio-1">Radio 1</gup-radio-button>
          <gup-radio-button name="radios" value="radio-2">Radio 2</gup-radio-button>
          <gup-radio-button name="radios" value="radio-3">Radio 3</gup-radio-button>
        </gup-radio-button-group>
        <gup-file-upload name="file-upload">Upload a file</gup-file-upload>
        <gup-checkbox name="your-checkbox" value="1">Checkbox label</gup-checkbox>
      `
    ),
};
