import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './radio-button-group';
import '../radio-button/radio-button';
import { type RadioButtonGroup } from './radio-button-group';

const { argTypes, args, template, events } = getWcStorybookHelpers('gup-radio-button-group');
type Story = StoryObj<RadioButtonGroup & typeof args>;

export default {
  title: 'Components/Forms/Radio buttons/Radio button group',
  component: 'gup-radio-button-group',
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
  },
  args: {
    ...args,
    label: 'Radio button group with many items',
    name: 'radios',
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-radio-button name="radios" value="radio-1">Radio 1</gup-radio-button>
        <gup-radio-button name="radios" value="radio-2">Radio 2 offer higher barn farmer most butter desert then everywhere air property street war dawn sit rate making mother decide shadow proud supper month bank lack them corn coach slave mile drop film higher truck manner typical winter teacher market valley recognize fuel canal list every strength palace handsome street brass stream month mood airplane alphabet string dirt interior better nice</gup-radio-button>
        <gup-radio-button name="radios" value="radio-3">Radio 3</gup-radio-button>
      `
    ),
};

export const WithValue: Story = {
  ...Default,
  args: {
    value: 'radio-2',
  },
};

export const WithHint: Story = {
  ...Default,
  args: {
    'hint-slot': 'Alphabet familiar kind mail development though smallest tank exclaimed enough log knowledge frequently hunter ahead while',
  },
};

export const InForm: Story = {
  ...Default,
  render: (args) => html`
    <form>
      ${template(
        args,
        html`
        <gup-radio-button name="radios" value="radio-1">Radio 1</gup-radio-button>
        <gup-radio-button name="radios" value="radio-2">Radio 2</gup-radio-button>
      `
      )}
      <button type="submit">Submit</button>
    </form>
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          console.log(Object.fromEntries(formData), 'form data');
          for (const element of event.target.elements) {
            if (element.nodeName !== 'BUTTON') {
              console.log('component name', element.name);
              console.log('component value', element.value);
            }
          }
        });
      })();
    </script>
  `,
  args: {
    label: 'In form',
  },
};

export const Required: Story = {
  ...InForm,
  args: {
    required: true,
  },
};

export const WithErrorMessage: Story = {
  ...InForm,
  args: {
    'error-message': 'This is a custom error message.',
    required: true,
  },
};

export const RTL: Story = {
  args: {
    label: 'راديو يحتوي على عدة خيارات',
  },
  parameters: {
    direction: 'rtl',
  },
  render: (args) =>
    template(
      args,
      html`
      <gup-radio-button name="radios" value="radio-1">قيمة ١</gup-radio-button>
      <gup-radio-button name="radios" value="radio-2">قيمة ٢ نص طويل عربي عشوائي</gup-radio-button>
      <gup-radio-button name="radios" value="radio-3">قيمة ٣</gup-radio-button>
    `
    ),
};
