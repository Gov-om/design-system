import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { GupIconNames } from '@govom/icons/dist/index';
import './accordion-item-action';
import '../accordion/accordion';
import { type AccordionItemAction } from './accordion-item-action';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-accordion-item-action');
type Story = StoryObj<AccordionItemAction & typeof args>;

export default {
  title: 'Components/Accordion/Accordion item action',
  component: 'gup-accordion-item-action',
  args: {
    ...args,
    'default-slot': 'Show',
    'icon-name': 'add-circle-outline',
  },
  argTypes: {
    ...argTypes,
    'icon-name': {
      options: Object.values(GupIconNames).sort(),
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const RTL: Story = {
  ...Default,
  args: {
    'default-slot': 'عرض',
  },
  parameters: {
    direction: 'rtl',
  },
};
