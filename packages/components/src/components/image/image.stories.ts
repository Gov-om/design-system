import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './image';
import { type Image } from './image';

const { argTypes, args, template } = getWcStorybookHelpers('gup-image');
type Story = StoryObj<Image & typeof args>;

export default {
  title: 'Components/Image',
  component: 'gup-image',
  argTypes,
  args: {
    ...args,
    src: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Alt text',
    'caption-slot': 'Caption',
    width: 300,
    height: 300,
  },
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithErrorMessage: Story = {
  ...Default,
  args: {
    src: 'invalid',
    errorMessage: 'Error loading image',
  },
};

export const WithCustomHTMLInCaption: Story = {
  ...Default,
  args: {
    'caption-slot': 'Caption with some HTML, eg. an <strong>accent</strong>',
  },
};

export const WithCustomErrorSlot: Story = {
  render: (args) =>
    template(
      {
        ...args,
        src: 'invalid',
      },
      html`
        <div slot="error" style="width:${args.width}; height:${args.height}; border:1px solid #e2e2e2; border-radius: 12px;display:flex;justify-content:center;align-items:center;text-white">Image failed to load 🤕</div>
      `
    ),
};
