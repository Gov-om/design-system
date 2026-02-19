import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../dropdown-menu/dropdown-menu';
import './dropdown-menu-item';
import { type DropdownMenuItem } from './dropdown-menu-item';
import { htmlAddonTransformSourceStripAll } from '../../../../.storybook/utils';

const { args, argTypes, events } = getWcStorybookHelpers('gup-dropdown-menu-item');
type Story = StoryObj<DropdownMenuItem & typeof args>;

export default {
  title: 'Components/Forms/Dropdown/Dropdown menu item',
  component: 'gup-dropdown-menu-item',
  args: {
    ...args,
    label: 'Dropdown item',
  },
  argTypes: {
    ...argTypes,
    visible: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
    html: {
      transform: (code: string) => htmlAddonTransformSourceStripAll(code).replace(/visible="[^\\"]*"/g, ''),
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-dropdown-menu>
      <gup-dropdown-menu-item
        label="${args.label}"
        ?disabled="${args.disabled}"
        value="item1"
      ></gup-dropdown-menu-item>
      <gup-dropdown-menu-item label="Item 2" value="item2"></gup-dropdown-menu-item>
      <gup-dropdown-menu-item value="item3" label="Slot content is provided, so I, the label value, am ignored">
        Item 3 with <em>custom HTML</em>
      </gup-dropdown-menu-item>
    </gup-dropdown-menu>
  `,
};
