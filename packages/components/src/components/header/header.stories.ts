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
  excludeStories: ['headerTemplate'],
} as Meta;

export const headerTemplate: TemplateResult = html`
  <gup-track slot="start">
    <gup-button appearance="text">
      Save & exit
      <gup-icon slot="icon-start" icon-name="close" height="24" width="24"></gup-icon>
    </gup-button>
  </gup-track>
  <gup-track slot="end" horizontal-alignment="right">
    <gup-button appearance="text">
      Do you need help?
      <gup-icon slot="icon-start" icon-name="live-help" height="24" width="24"></gup-icon>
    </gup-button>
  </gup-track>
`;

export const Default: Story = {
  render: (args) => template(args, headerTemplate),
};
