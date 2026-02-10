import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './tab-panel';
import '../tabs/tabs';
import '../tabs-navigation/tabs-navigation';
import '../tab/tab';

import { type TabPanel } from './tab-panel';

const { argTypes, args } = getWcStorybookHelpers('gup-tab-panel');
type Story = StoryObj<TabPanel & typeof args>;

export default {
  title: 'Components/Tabs/Tab panel',
  component: 'gup-tab-panel',
  argTypes,
  args,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: () => html`
    <gup-tabs>
      <gup-tabs-navigation>
        <gup-tab>First tab</gup-tab>
        <gup-tab>Second tab</gup-tab>
        <gup-tab>Third tab</gup-tab>
        <gup-tab>Last tab</gup-tab>
      </gup-tabs-navigation>
      <gup-tab-panel>
        Panel for first tab
      </gup-tab-panel>
      <gup-tab-panel>
        Panel for second tab
      </gup-tab-panel>
      <gup-tab-panel>
        Panel for third tab
      </gup-tab-panel>
      <gup-tab-panel>
        Panel for last tab
      </gup-tab-panel>
    </gup-tabs>
  `,
};
