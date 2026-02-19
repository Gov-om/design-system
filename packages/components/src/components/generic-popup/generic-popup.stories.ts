import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './generic-popup';
import '../button/button';
import { type GenericPopup } from './generic-popup';
import { storybookArgAttachment, storybookFloatingUIArgPlacement } from '../../../.storybook/utils';
// import '../../../.storybook/components/storybook-comment/storybook-comment';

const { args, argTypes, template } = getWcStorybookHelpers('gup-generic-popup');
type Story = StoryObj<GenericPopup & typeof args>;

export default {
  title: 'Utilities/Generic popup',
  component: 'gup-generic-popup',
  args: {
    ...args,
    'default-slot': 'Popup content',
    storybookAttachment: 'top',
  },
  argTypes: {
    ...argTypes,
    placement: storybookFloatingUIArgPlacement,
    // Attachment of the activating element in relation to viewport
    storybookAttachment: storybookArgAttachment,
    target: {
      control: false,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <div class="sb-attachment-canvas sb-attachment-canvas--position-${args.storybookAttachment}">
      ${template(args)}
      <gup-button class="target">
        Click to open the popup
      </gup-button>
    </div>
    <!-- <storybook-comment>NB: <code>gup-generic-popup</code> almost never is meant to be used directly on its own. Being a styleless component, its purpose is to be used to construct higher order components that bring their own styling.</storybook-comment> -->
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('.target').addEventListener('click', (event) => {
          const popup = storyRoot.querySelector('gup-generic-popup');
          popup.target = event.target;
          popup.show();
        });
      })();
    </script>
  `,
};

export const Open: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    await canvasElement?.querySelector('.target')?.dispatchEvent(new Event('click'));
  },
};

export const WithLongContentPlacementLeftOnLeftEdge: Story = {
  ...Open,
  name: 'With long content, placement set to left, on the left edge of the viewport',
  args: {
    'placement': 'left',
    storybookAttachment: 'top-start',
    'default-slot':
      'The placement prop controls whether the popup should be displayed on the chosen side of the target element. The popup will be displayed on the opposite side if there is not enough space. As an example, for the popup to be displayed on the left side, the target element should be on the right side of the screen. Note that for the best results you should give the content slotted into the popup a max-width.',
  },
};

export const WithArrowBottom: Story = {
  ...Open,
  args: {
    offset: 10,
    '--gup-generic-popup--arrow-border-color': 'pink',
    '--gup-generic-popup--arrow-border-size': '1px',
    '--gup-generic-popup--arrow-size': '10px',
    '--gup-generic-popup--arrow-background-color': 'red',
    'default-slot': `<div style="padding: 10px; background-color: var(--gup-generic-popup--arrow-background-color); border-radius: 4px;">
      The placement prop controls whether the popup should be displayed on the chosen side of the target element. The popup will be displayed on the opposite side if there is not enough space. As an example, for the popup to be displayed on the left side, the target element should be on the right side of the screen. Note that for the best results you should give the content slotted into the popup a max-width.
    </div>`,
  },
};

export const WithArrowTop: Story = {
  ...WithArrowBottom,
  args: {
    ...WithArrowBottom.args,
    placement: 'top',
    storybookAttachment: 'bottom',
  },
};

export const WithArrowLeft: Story = {
  ...WithArrowBottom,
  args: {
    ...WithArrowBottom.args,
    placement: 'left',
    storybookAttachment: 'center-end',
  },
};

export const WithArrowRight: Story = {
  ...WithArrowBottom,
  args: {
    ...WithArrowBottom.args,
    placement: 'right',
    storybookAttachment: 'center',
  },
};

export const WithArrowRightStart: Story = {
  ...WithArrowBottom,
  args: {
    ...WithArrowBottom.args,
    placement: 'right-start',
  },
};

export const WithArrowRightStartAtBottom: Story = {
  ...WithArrowBottom,
  args: {
    ...WithArrowBottom.args,
    placement: 'right',
    storybookAttachment: 'bottom',
  },
};
