import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './tabs-navigation';
import '../tabs/tabs';
import '../tab/tab';
import '../tab-panel/tab-panel';

import { type TabsNavigation } from './tabs-navigation';

const { argTypes, args, template } = getWcStorybookHelpers('gup-tabs-navigation');

type Story = StoryObj<TabsNavigation & typeof args>;
export default {
  title: 'Components/Tabs/Tabs navigation',
  component: 'gup-tabs-navigation',
  argTypes,
  args,
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-tabs>
      ${template(
        args,
        html`
          <gup-tab>First tab</gup-tab>
          <gup-tab>Second tab</gup-tab>
          <gup-tab>Third tab</gup-tab>
        `
      )}
      <gup-tab-panel>
        Panel for first tab
      </gup-tab-panel>
      <gup-tab-panel>
        Panel for second tab
      </gup-tab-panel>
      <gup-tab-panel>
        Panel for third tab
      </gup-tab-panel>
    </gup-tabs>`,
};
