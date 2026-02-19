/* eslint-disable lit-a11y/no-autofocus */
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { useArgs } from '@storybook/preview-api';
import { html } from 'lit';
import { GupIconNames } from '@govom/icons/dist/index';

import '../track/track';
import './icon';
import { type Icon } from './icon';

const { args, argTypes, template } = getWcStorybookHelpers('gup-icon');
type Story = StoryObj<Icon & typeof args>;

export default {
  title: 'Components/Icon',
  component: 'gup-icon',
  argTypes: {
    ...argTypes,
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
    'icon-name': {
      options: Object.values(GupIconNames).sort(),
      control: { type: 'select' },
    },
    'fill-color': {
      control: 'color',
    },
    '--gup-icon--fill-color': {
      control: { type: 'color' },
    },
  },
  args: {
    ...args,
    'icon-name': 'chat-bubble-outline',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithCustomFillColor: Story = {
  ...Default,
  args: {
    'fill-color': 'red',
    'icon-name': 'arrow-forward',
  },
};

export const WithCustomFillColorCSSVariables: Story = {
  ...Default,
  name: 'With Custom Color Using CSS Variables',
  args: {
    'fill-color': undefined,
    '--gup-icon--fill-color': 'blue',
    'icon-name': 'arrow-forward',
  },
};

export const WithFlippedDirectionInRTLLTR: Story = {
  ...Default,
  name: 'With Flipped Direction in RTL (LTR shown)',
  args: {
    'rtl-flip-enabled': true,
    'icon-name': 'arrow-forward',
  },
};

export const WithFlippedDirectionInRTLRTL: Story = {
  ...Default,
  name: 'With Flipped Direction in RTL (RTL shown)',
  args: {
    'rtl-flip-enabled': true,
    'icon-name': 'arrow-forward',
  },
  parameters: {
    direction: 'rtl',
  },
};

export const WithCustomSize: Story = {
  ...Default,
  args: {
    width: '24',
    height: '24',
  },
};

export const WithCustomSizeCSSVariables: Story = {
  ...Default,
  name: 'With Custom Size Using CSS Variables',
  args: {
    width: undefined,
    height: undefined,
    '--gup-icon--width': '48px',
    '--gup-icon--height': '48px',
  },
};

export const AllIcons: Story = {
  args: {
    value: '',
  },
  render: (args) => {
    // Lit doesn't support reactive non-prop variables, so we have to use useArgs to trigger rerender
    const [, updateArgs] = useArgs();
    const filterIcons = (query: string) => {
      const icons = Object.values(GupIconNames);
      return query ? icons.filter((iconName: string) => iconName.includes(query)) : icons;
    };
    const updateValue = (e: MouseEvent) => updateArgs({ ...args, value: (e.target as HTMLInputElement).value });
    return html`
      <input type="text" value="${args.value}"
      .value="${args.value}" autofocus placeholder="Filter icons by name" @input="${updateValue}" style="padding: var(--gup-component-2);" />
      <gup-track gap="4" is-multiline style="margin-top: var(--gup-spacing-text-to-component);">
        ${filterIcons(args.value).map(
          (name) => html`
            <gup-icon title="${name}" icon-name="${name}"></gup-icon>
          `
        )}
      </gup-track>
    `;
  },
  parameters: {
    layout: 'padded',
    axe: { skip: true },
    chromatic: { disableSnapshot: true },
  },
};
