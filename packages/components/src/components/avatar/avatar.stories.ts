import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './avatar';
import { type Avatar } from './avatar';

const { args, argTypes, template } = getWcStorybookHelpers('gup-avatar');
type Story = StoryObj<Avatar & typeof args>;

export default {
  title: 'Components/Avatar',
  component: 'gup-avatar',
  args: {
    ...args,
    label: 'Angelo Badalamenti',
  },
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const WithNoLabel: Story = {
  ...Default,
  args: {
    label: '',
  },
};

export const WithStatus: Story = {
  ...Default,
  args: {
    size: 'l',
    label: '',
    status: 'positive',
  },
};
export const WithPicture: Story = {
  ...Default,
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Some Profile',
    size: 'm',
  },
};

export const Small: Story = {
  ...Default,
  args: {
    size: 's',
  },
};

export const Medium: Story = {
  ...Default,
  args: {
    size: 'm',
  },
};

export const Large: Story = {
  ...Default,
  args: {
    size: 'l',
  },
};

export const RTL: Story = {
  ...Default,
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Some Profile',
    size: 'l',
    status: 'neutral',
  },
  parameters: {
    direction: 'rtl',
  },
};
