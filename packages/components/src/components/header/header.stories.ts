import { Meta, StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../button/button';
import '../icon/icon';
import '../track/track';
import './header';
import { type Header } from './header';

const { args, argTypes, template } = getWcStorybookHelpers('gup-header');
type Story = StoryObj<Header & typeof args>;

export default {
  title: 'Components/Layout/Header',
  component: 'gup-header',
  args: {
    ...args,
    'nav-aria-label': 'Service Navigation Header',
  },
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
  excludeStories: ['headerTemplate', 'headerActionLabelStyles'],
} as Meta;

export const headerTemplate: TemplateResult = html`
  <gup-track slot="start">
    <gup-button appearance="text">
      <span class="header-action-label">Save & exit</span>
      <gup-icon slot="icon-start" icon-name="close" height="24" width="24"></gup-icon>
    </gup-button>
  </gup-track>
  <gup-track slot="end" horizontal-alignment="right">
    <gup-button appearance="text">
      <span class="header-action-label">Do you need help?</span>
      <gup-icon slot="icon-start" icon-name="live-help" height="24" width="24"></gup-icon>
    </gup-button>
  </gup-track>
`;

export const headerActionLabelStyles: TemplateResult = html`
  <style>
    /* Header action labels are visually hidden by default and revealed from 750px up, as in the templates */
    .header-action-label {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
    }

    @media (min-width: 750px) {
      .header-action-label {
        position: static;
        width: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }
    }
  </style>
`;

export const Default: Story = {
  render: (args) => html`
    ${headerActionLabelStyles}
    ${template(args, headerTemplate)}
  `,
};
