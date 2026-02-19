import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './tab';
import { type Tab } from './tab';
import { html } from 'lit';

import '../tabs-navigation/tabs-navigation';
import '../tabs/tabs';
import '../../icon/icon';
import { TabsAppearance } from '../tabs/tabs.type';

const { argTypes, args, events } = getWcStorybookHelpers('gup-tab');

type Story = StoryObj<Tab & typeof args>;
export default {
  title: 'Components/Tabs/Tab',
  component: 'gup-tab',
  argTypes: {
    ...argTypes,
    tabsInheritedAppearance: {
      options: Object.values(TabsAppearance),
      control: { type: 'select' },
      name: 'Tabs Appearance',
      description: 'Visual appearance of the tabs, set through `appearance` prop of the parent `gup-tabs` component',
      table: {
        category: 'Playground',
        type: {
          summary: Object.values(TabsAppearance).join(' | '),
        },
      },
    },
  },
  args: {
    ...args,
    tabsInheritedAppearance: 'default',
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
    <gup-tabs appearance="${args.tabsInheritedAppearance}">
      <gup-tabs-navigation>
        <gup-tab>First Tab</gup-tab>
        <gup-tab disabled>Second Tab</gup-tab>
        <gup-tab>Third Tab</gup-tab>
        <gup-tab>Fourth Tab</gup-tab>
        <gup-tab>Fifth Tab</gup-tab>
      </gup-tabs-navigation>
      <gup-tab-panel>First tab content</gup-tab-panel>
      <gup-tab-panel>Second tab content</gup-tab-panel>
      <gup-tab-panel>Third tab content</gup-tab-panel>
      <gup-tab-panel>Fourth tab content</gup-tab-panel>
      <gup-tab-panel>Fifth tab content</gup-tab-panel>
    </gup-tabs>
  `,
};

export const Selected: Story = {
  render: (args) => html`
    <gup-tabs appearance="${args.tabsInheritedAppearance}">
      <gup-tabs-navigation>
        <gup-tab>First Tab</gup-tab>
        <gup-tab disabled>Second Tab</gup-tab>
        <gup-tab>Third Tab</gup-tab>
        <gup-tab selected>Fourth Tab</gup-tab>
        <gup-tab>Fifth Tab</gup-tab>
      </gup-tabs-navigation>
      <gup-tab-panel>First tab content</gup-tab-panel>
      <gup-tab-panel>Second tab content</gup-tab-panel>
      <gup-tab-panel>Third tab content</gup-tab-panel>
      <gup-tab-panel>Fourth tab content</gup-tab-panel>
      <gup-tab-panel>Fifth tab content</gup-tab-panel>
    </gup-tabs>
  `,
};

export const WithIcons: Story = {
  ...Default,
  render: (args) => html`
    <gup-tabs appearance="${args.tabsInheritedAppearance}">
      <gup-tabs-navigation>
        <gup-tab>First Tab</gup-tab>
        <gup-tab disabled>Second Tab</gup-tab>
        <gup-tab>Third Tab</gup-tab>
        <gup-tab>
          <gup-icon slot="icon-start" icon-name="save" height="24" width="24"></gup-icon>
          <gup-icon slot="icon-end" icon-name="person" height="24" width="24"></gup-icon>
          Fourth tab with icon
        </gup-tab>
        <gup-tab>Fifth Tab</gup-tab>
      </gup-tabs-navigation>
      <gup-tab-panel>First tab content</gup-tab-panel>
      <gup-tab-panel>Second tab content</gup-tab-panel>
      <gup-tab-panel>Third tab content</gup-tab-panel>
      <gup-tab-panel>Fourth tab content</gup-tab-panel>
      <gup-tab-panel>Fifth tab content</gup-tab-panel>
    </gup-tabs>
  `,
};
