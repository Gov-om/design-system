import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './file-item';
import { type FileItem } from './file-item';

import '../icon/icon';
import '../button/button';
// import '../../../.storybook/components/storybook-comment/storybook-comment';

const { args, argTypes, template } = getWcStorybookHelpers('gup-file-item');
type Story = StoryObj<FileItem & typeof args>;

export default {
  title: 'Components/File item',
  component: 'gup-file-item',
  args: {
    ...args,
    'thumbnail-src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
    'thumbnail-alt': 'Thumbnail',
    'file-name': 'file.png',
    'subtitle': '09.02.2021, 2 MB',
  },
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithLink: Story = {
  ...Default,
  args: {
    url: 'https://example.com/documents/designers-card.png',
  },
};

export const WithIconButton: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-button @gup-click="${(e: CustomEvent) => console.log(e)}" with-icon-only label="Remove the file" appearance="text">
          <gup-icon icon-name="delete-forever" height="24" width="24"></gup-icon>
        </gup-button>
    `
    )}
    <!-- <storybook-comment>This is the same button used inside of <code>gup-file-upload</code>.</storybook-comment> -->
  `,
};

export const WithCustomActionButton: Story = {
  render: (args) =>
    template(
      args,
      html`
      <gup-button @gup-click="${(e: CustomEvent) => console.log(e)}" appearance="text">Select</gup-button>
    `
    ),
};

export const Multiple: Story = {
  render: (args) => html`
    <div>Content before</div>
    ${template(args)}
    <gup-file-item file-name="file2.png" subtitle="30 MB"></gup-file-item>
    <div>Content after</div>
  `,
};
