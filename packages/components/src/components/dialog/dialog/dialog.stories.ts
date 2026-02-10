import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './dialog';
import { type Dialog } from './dialog';

// import '../../../../.storybook/components/storybook-comment/storybook-comment';
import '../../button-group/button-group';
import '../../button/button';
import '../../track/track';
import '../../input-field/input-field';

const { args, argTypes, template, events } = getWcStorybookHelpers('gup-dialog');
type Story = StoryObj<Dialog & typeof args>;

export default {
  title: 'Components/Dialogs/Dialog',
  component: 'gup-dialog',
  args: {
    ...args,
    heading: 'Do you want to save your progress?',
    'default-slot': 'Save now to keep any changes you’ve made so far.',
  },
  argTypes,
  parameters: {
    layout: 'fullscreen',
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
        <gup-button-group slot="action-buttons">
          <gup-button appearance="secondary">Submit</gup-button>
          <gup-button appearance="text">Cancel</gup-button>
        </gup-button-group>
      `
    )}
    <!-- <storybook-comment>Always use a <code>gup-button</code> with <code>appearance=primary</code> and a <code>gup-button</code> with <code>appearance=text</code> as action buttons.</storybook-comment> -->
  `,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 350,
      },
    },
  },
};

export const WithLongContent: Story = {
  ...Default,
  args: {
    heading: 'Dialog with Long Content',
    'default-slot': `
      <p>This is a paragraph with a lot of content to demonstrate scrolling.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
      <p>Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nunc nisl quis nisl.</p>
    `,
  },
};

export const WithFormContent: Story = {
  ...Default,
  args: {
    heading: 'Form Example',
    'default-slot': `
      <gup-track gap="2" direction="vertical">
        <gup-input-field placeholder="Enter your name">Name</gup-input-field>
        <gup-input-field placeholder="Enter your email">Email</gup-input-field>
      </gup-track>
    `,
  },
};

export const WithoutCloseButton: Story = {
  ...Default,
  args: {
    heading: 'No Close Button Dialog',
    'hide-close-button': true,
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    heading: 'رسالة مؤكدة',
    'default-slot': 'هذا هو محتوى النافذة المنبثقة. يمكنك وضع أي محتوى تريده هنا.',
  },
  parameters: {
    direction: 'rtl',
    docs: {
      story: {
        inline: false,
        iframeHeight: 350,
      },
    },
  },
};
