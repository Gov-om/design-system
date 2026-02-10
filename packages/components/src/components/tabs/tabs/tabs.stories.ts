import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './tabs';
import '../tabs-navigation/tabs-navigation';
import '../tab/tab';
import '../tab-panel/tab-panel';

import { type Tabs } from './tabs';
import { TabsAppearance } from './tabs.type';

// import '../../../../.storybook/components/storybook-comment/storybook-comment';

const { argTypes, args, template, events } = getWcStorybookHelpers('gup-tabs');

type Story = StoryObj<Tabs & typeof args>;

export default {
  title: 'Components/Tabs/Tabs',
  component: 'gup-tabs',
  argTypes,
  args: {
    ...args,
    appearance: TabsAppearance.Default,
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
  ${template(
    args,
    html`
      <gup-tabs-navigation>
        <gup-tab>First tab</gup-tab>
        <gup-tab>Second tab</gup-tab>
        <gup-tab>Third tab</gup-tab>
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
    `
  )}
  <!-- <storybook-comment>Click <code><button class="select-tab">this button</button></code> to select the third tab programmatically using the component's <code>selectTab()</code> method.</storybook-comment> -->
  <script>
    (function() {
      const storyRoot = document.getElementById('${args['data-story-id']}');
      storyRoot.querySelector('.select-tab').addEventListener('click', () => {
        storyRoot.querySelector('gup-tabs').selectTab(2);
      });
    })();
  </script>
    `,
};

export const WithFullWidth: Story = {
  ...Default,
  args: {
    'is-full-width': true,
  },
};

export const WithAppearanceToggle: Story = {
  ...Default,
  args: {
    appearance: TabsAppearance.Toggle,
  },
};

export const WithAppearanceToggleFullWidth: Story = {
  ...Default,
  args: {
    appearance: TabsAppearance.Toggle,
    'is-full-width': true,
  },
};

export const WithAppearanceVertical: Story = {
  ...Default,
  args: {
    appearance: TabsAppearance.Vertical,
  },
};

export const WithExtremeNumberOfTabs: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <gup-tabs-navigation>
          <gup-tab>First tab</gup-tab>
          <gup-tab>Second tab</gup-tab>
          <gup-tab>Third tab</gup-tab>
          <gup-tab>Another tab</gup-tab>
          <gup-tab>Another tab</gup-tab>
          <gup-tab>Another tab</gup-tab>
          <gup-tab>Another tab</gup-tab>
          <gup-tab>Without whether dog</gup-tab>
          <gup-tab>Yet another tab</gup-tab>
          <gup-tab>Yet another tab</gup-tab>
          <gup-tab>Satellites saddle slight laugh each look</gup-tab>
          <gup-tab>Yet another tab</gup-tab>
        </gup-tabs-navigation>
        <gup-tab-panel>Panel for first tab</gup-tab-panel>
        <gup-tab-panel>Panel for second tab</gup-tab-panel>
        <gup-tab-panel>Panel for third tab</gup-tab-panel>
        ${[...Array(9)].map(
          (_, i) => html`<gup-tab-panel>Panel number ${i + 4}</gup-tab-panel>
        `
        )}
      `
    ),
};

export const RTL: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-tabs-navigation>
          <gup-tab>التبويب الأول</gup-tab>
          <gup-tab>التبويب الثاني</gup-tab>
          <gup-tab>التبويب الثالث</gup-tab>
        </gup-tabs-navigation>
        <gup-tab-panel>
          لوحة التبويب الأول
        </gup-tab-panel>
        <gup-tab-panel>
          لوحة التبويب الثاني
        </gup-tab-panel>
        <gup-tab-panel>
          لوحة التبويب الثالث
        </gup-tab-panel>
      `
    ),
  parameters: {
    direction: 'rtl',
  },
};
