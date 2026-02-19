import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './tooltip';
import { type Tooltip } from './tooltip';
import { html, TemplateResult } from 'lit';

import '../button/button';
import '../generic-popup/generic-popup';
import '../track/track';
import '../link/link';
import { htmlAddonTransformSourceStripAll, storybookArgAttachment, storybookFloatingUIArgPlacement } from '../../../.storybook/utils';
// import '../../../.storybook/components/storybook-comment/storybook-comment';

const { args, argTypes, template } = getWcStorybookHelpers('gup-tooltip');
type Story = StoryObj<Tooltip & typeof args>;

export default {
  title: 'Components/Tooltip',
  component: 'gup-tooltip',
  args: {
    ...args,
    title: 'Tooltip title',
    storybookAttachment: 'top',
  },
  argTypes: {
    ...argTypes,
    placement: storybookFloatingUIArgPlacement,
    // Attachment of the activating element in relation to viewport
    storybookAttachment: storybookArgAttachment,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
    target: {
      control: false,
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
      source: {
        transform: htmlAddonTransformSourceStripAll,
      },
    },
  },
} as Meta;

const templateWithConfigurablePosition = (args: Tooltip & typeof storybookArgAttachment, slotTemplate = html``): TemplateResult => {
  return html`
    <div class="sb-attachment-canvas sb-attachment-canvas--position-${args.storybookAttachment}">
      ${template({ ...args, target: `${args['data-story-id']}-target` }, slotTemplate)}
      <gup-button class="button" id="${args['data-story-id']}-target">Click to open the tooltip</gup-button>
    </div>
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('#${args['data-story-id']}-target').addEventListener('gup-click', (event) => {
          storyRoot.querySelector('gup-tooltip').showTooltip();
        });
      })();
    </script>
  `;
};

export const Default: Story = {
  render: (args) => templateWithConfigurablePosition(args),
};

export const Open: Story = {
  ...Default,
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play: async ({ canvasElement }) => {
    await canvasElement?.querySelector('.button')?.dispatchEvent(new CustomEvent('gup-click'));
  },
};

export const WithHint: Story = {
  ...Open,
  args: {
    hint: 'Hint text',
  },
};

export const WithLongContent: Story = {
  ...Open,
  args: {
    title:
      'About feel object feet rising mass tall sure color thirty ground cover region separate figure religious prevent below brought last good wind enjoy burn behavior sometime everything air observe search card current obtain threw might cast citizen floor captured root feet lucky getting strip happily nearer bad cage notice alone pool begun all fireplace zoo men box excellent tribe wear particles classroom ground perhaps equator key somewhere ago river pet slowly victory oil fast fun worry clearly root answer slipped drawn exercise still gate person greater population case crowd made wrong met success aware fierce came',
  },
};

export const WithMaxWidth: Story = {
  ...Open,
  args: {
    title: 'Note that --gup-tooltip--max-width CSS property overrides the component max-width prop',
    'max-width': 100,
    '--gup-tooltip--max-width': '300px',
  },
};

export const WithLongContentAndPlacementLeftOnLeftEdge: Story = {
  ...WithLongContent,
  name: 'With long content, placement set to left, on the left edge of the viewport',
  args: {
    ...WithLongContent.args,
    placement: 'left',
    storybookAttachment: 'center-start',
  },
};

export const WithLongContentAndPlacementRightOnRightEdge: Story = {
  ...WithLongContent,
  name: 'With long content, placement set to right, on the right edge of the viewport',
  args: {
    ...WithLongContent.args,
    placement: 'right',
    storybookAttachment: 'bottom-end',
  },
};

export const WithActionButton: Story = {
  ...Open,
  render: (args) => templateWithConfigurablePosition(args, html`<gup-link href="#">Action</gup-link>`),
  args: {
    hint: 'Hint text',
  },
};
