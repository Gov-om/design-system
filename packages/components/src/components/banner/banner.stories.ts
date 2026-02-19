import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './banner';
import { type Banner } from './banner';
import '../button-group/button-group';
import '../button/button';
import '../icon/icon';
import '../rich-text/rich-text';
import '../link/link';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-banner');
type Story = StoryObj<Banner & typeof args>;

export default {
  title: 'Components/Banner',
  component: 'gup-banner',
  args: {
    ...args,
    type: 'neutral',
    'default-slot':
      'But couldn’t there be a definition of the normal which didn’t equate it with the ordinary or uninspiring? Or which wasn’t coercive or ridiculously prim?',
    'title-slot': 'Normality is the gentrification of ordinary madness – ask an Surrealist',
  },
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const TypeNeutral: Story = {
  ...Default,
};

export const TypeSuccess: Story = {
  ...Default,
  args: {
    type: 'success',
  },
};

export const TypeWarning: Story = {
  ...Default,
  args: {
    type: 'warning',
  },
};

export const TypeError: Story = {
  ...Default,
  args: {
    type: 'error',
  },
};

export const Filled: Story = {
  ...Default,
  args: {
    appearance: 'filled',
  },
};

export const SuccessFilled: Story = {
  ...Default,
  args: {
    type: 'success',
    appearance: 'filled',
  },
};

export const WarningFilled: Story = {
  ...Default,
  args: {
    type: 'warning',
    appearance: 'filled',
  },
};

export const ErrorFilled: Story = {
  ...Default,
  args: {
    type: 'error',
    appearance: 'filled',
  },
};

export const WithoutIcon: Story = {
  ...Default,
  args: {
    'hide-icon': true,
  },
};

export const WithFullWidth: Story = {
  ...Default,
  args: {
    '--gup-banner--width': '100%',
  },
};

export const WithCloseButton: Story = {
  ...Default,
  args: {
    'show-close-button': true,
  },
};

export const WithActionButtons: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <gup-button-group slot="action-buttons">
          <gup-button>Submit</gup-button>
          <gup-button appearance="text">Cancel</gup-button>
        </gup-button-group>
      `
    ),
};

export const WithFormError: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <gup-rich-text slot="action-buttons">
          <ul>
            <li>
              <b><gup-link severity="danger" href="#form-item-error">Please enter upload Previous Qualification Certificate (PhD)</gup-link></b>
            </li>
          </ul>
        </gup-rich-text>
      `
    ),
  args: {
    type: 'error',
    'title-slot': 'There is a problem',
    'default-slot': 'It looks like we’re missing a few details. Please provide the following information to continue:',
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'ولكن هل يمكن أن يكون هناك تعريف للعادي لا يعادله العادي أو الباهت؟ أو الذي لا يكون قسريًا أو مبالغًا فيه أو مبالغًا فيه؟',
    'title-slot': 'العادي هو تجميل الجنون العادي - اسأل سريالي',
  },
  parameters: {
    direction: 'rtl',
  },
};
