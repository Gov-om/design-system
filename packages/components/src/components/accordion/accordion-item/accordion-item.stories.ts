import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './accordion-item';
import '../accordion/accordion';
import { type AccordionItem } from './accordion-item';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-accordion-item');
type Story = StoryObj<AccordionItem & typeof args>;

export default {
  title: 'Components/Accordion/Accordion item',
  component: 'gup-accordion-item',
  args: {
    ...args,
    'default-slot': 'I am an accordion item',
    'label-slot': 'I am the accordion item label',
  },
  argTypes,
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-accordion>
      ${template(args)}
    </gup-accordion>
  `,
};

export const Open: Story = {
  ...Default,
  args: {
    open: true,
  },
};

export const WithLongTitle: Story = {
  ...Default,
  args: {
    'label-slot':
      'Click me by coming <em>terrible trace</em> various only exercise middle recall when manufacturing last official buy sentence church monkey engineer shelf stick son huge spoken',
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    'label-slot': 'انقر هنا',
    'label-show': 'عرض',
    'label-hide': 'اخفاء',
  },
  parameters: {
    direction: 'rtl',
  },
};
