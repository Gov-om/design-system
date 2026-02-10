import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../icon/icon';
import '../track/track';
import './button';
import { type Button } from './button';

// import '../../../.storybook/components/storybook-comment/storybook-comment';

const { events, args, argTypes, template } = getWcStorybookHelpers('gup-button');
type Story = StoryObj<Button & typeof args>;

export default {
  title: 'Components/Button',
  component: 'gup-button',
  args: {
    ...args,
    'default-slot': 'I am a button',
  },
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const Secondary: Story = {
  ...Default,
  args: {
    appearance: 'secondary',
  },
};

export const Text: Story = {
  ...Default,
  args: {
    appearance: 'text',
  },
};

export const TextWithoutUnderline: Story = {
  ...Default,
  args: {
    appearance: 'text',
    '--gup-button--underline': 'none',
  },
};

export const Danger: Story = {
  ...Default,
  args: {
    appearance: 'danger',
  },
};

export const AsClickableLink: Story = {
  ...Default,
  args: {
    kind: 'link',
    href: '#',
    'default-slot': 'I am a link',
  },
};

export const AsClickableLinkOpeningInNewTab: Story = {
  ...AsClickableLink,
  args: {
    kind: 'link',
    href: '#',
    'open-in-new-tab': true,
    'default-slot': 'I am a link that opens in a new tab',
  },
};

export const Inverted: Story = {
  ...Default,
  args: {
    inverted: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const SecondaryInverted: Story = {
  ...Default,
  args: {
    inverted: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const TextInverted: Story = {
  ...Default,
  args: {
    appearance: 'text',
    inverted: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const DangerInverted: Story = {
  ...Default,
  args: {
    appearance: 'danger',
    inverted: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  ...Default,
  render: (args) => html`
    <div style="width: 300px;">
      <gup-track items-equal>
        ${template(
          args,
          html`
            <gup-icon slot="icon-end" icon-name="add" height="24" width="24"></gup-icon>
          `
        )}
      </gup-track>
    </div>
    <!-- <storybook-comment>
      <p>You can make a <code>gup-button</code> fill all available width by wrapping it in a <code>gup-track</code> with an <code>items-equal</code> attribute.</p>
      <p>Here it fills an ancestor <code>div</code> with the width of the latter set to <code>300px</code>.</p>
    </storybook-comment> -->
  `,
};

export const WithIconStart: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
      <gup-icon slot="icon-start" icon-name="add" height="24" width="24"></gup-icon>
    `
    ),
};

export const WithIconEnd: Story = {
  ...Default,
  render: (args) => html`
    <!-- <storybook-comment>NB: You can ensure that a language direction-dependent icon (such as arrow) is displayed correctly in RTL mode by adding <code>rtl-flip-enabled</code> attribute to <code>gup-icon</code>.</storybook-comment> -->
    ${template(
      args,
      html`
        <gup-icon rtl-flip-enabled slot="icon-end" icon-name="arrow-forward" height="24" width="24"></gup-icon>
      `
    )}
  `,
};

export const WithIconOnly: Story = {
  ...Default,
  args: {
    'default-slot': '',
    'with-icon-only': true,
    label: 'admin',
  },
  render: (args) =>
    template(
      args,
      html`
      <gup-icon icon-name="person" height="24" width="24"></gup-icon>
    `
    ),
};
