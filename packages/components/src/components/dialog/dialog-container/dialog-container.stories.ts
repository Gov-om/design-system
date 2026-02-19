import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './dialog-container';
import { type DialogContainer } from './dialog-container';

import '../../button/button';
import '../../track/track';
import '../../button-group/button-group';
import '../../input-field/input-field';
// import '../../../../.storybook/components/storybook-comment/storybook-comment';
import { Dialog } from '../dialog/dialog';

const { args, argTypes, template } = getWcStorybookHelpers('gup-dialog-container');
type Story = StoryObj<DialogContainer & typeof args>;

export default {
  title: 'Components/Dialogs/Dialog container',
  component: 'gup-dialog-container',
  args,
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const fillerHTML = html`
  <div>
    <h3 class="toc-ignore" style="position: relative; background-color: white">Relatively positioned content behind dialog</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</p>
    <p>Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
    <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
    <p>Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.</p>
    <p>Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.</p>
  </div>
`;

export const Default: Story = {
  render: (args) => html`
    <div>
      <h2>Dialog Container Example</h2>
      <p>Use the buttons below to open different types of dialogs. The dialog container manages all dialogs and their interactions.</p>
      <gup-track>
        <gup-button id="openSimpleDialogButton">Open Simple Dialog</gup-button>
        <gup-button id="openFormDialogButton">Open Form Dialog</gup-button>
        <gup-button id="openLongContentDialogButton">Open Long Content Dialog</gup-button>
        <gup-button id="openNoCloseButtonDialogButton">Open Dialog without Close Button</gup-button>
      </gup-track>
      ${fillerHTML}
    </div>
    ${template(args)}
    <!-- <storybook-comment>
      <p>Add <code>gup-dialog-container</code> right after the content that you want dialogs to appear on top of, or use <code>content-selector</code> prop to indicate it.</p>
      <p>NB: <code>gup-dialog-container</code> MUST be located outside of the page content DOM node.</p>
    </storybook-comment> -->
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        const container = storyRoot.querySelector('gup-dialog-container');
        const simpleButton = storyRoot.querySelector('#openSimpleDialogButton');
        const formButton = storyRoot.querySelector('#openFormDialogButton');
        const longContentButton = storyRoot.querySelector('#openLongContentDialogButton');
        const noCloseButtonButton = storyRoot.querySelector('#openNoCloseButtonDialogButton');

        if (simpleButton) {
          simpleButton.addEventListener('gup-click', function() {
            if (container) {
              container.createDialog({
                heading: 'Simple Dialog',
                content: '<p>This is a simple dialog with a message and a close button.</p>',
              });
            }
          });
        }

        if (formButton) {
          formButton.addEventListener('gup-click', function() {
            if (container) {
              container.createDialog({
                heading: 'Form Dialog',
                content: '<gup-input-field label="Name" placeholder="Enter your name"></gup-input-field>',
                actionButtons: '<gup-button appearance="primary">Submit</gup-button>'
              });
            }
          });
        }

        if (longContentButton) {
          longContentButton.addEventListener('gup-click', function() {
            if (container) {
              let longContent = '';
              for (let i = 0; i < 10; i++) {
                longContent += '<p>This dialog has a lot of content to demonstrate scrolling.</p>';
              }

              container.createDialog({
                heading: 'Long Content Dialog',
                content: longContent
              });
            }
          });
        }

        if (noCloseButtonButton) {
          noCloseButtonButton.addEventListener('gup-click', function() {
            if (container) {
              container.createDialog({
                heading: 'Dialog without Close Button',
                content: '',
                actionButtons: '<gup-button appearance="secondary">Submit</gup-button>',
                hideCloseButton: true
              });
            }
          });
        }

        document.addEventListener('click', function(event) {
          const target = event.target;
          if (target && target.tagName === 'GUP-BUTTON' && target.closest('gup-dialog')) {
            const dialog = target.closest('gup-dialog');
            if (dialog && container) {
              container.closeDialog(dialog);
            }
          }
        });
      })();
    </script>

  `,
};

export const WithDialogOpen: Story = {
  ...Default,
  render: (args) => html`
    ${template(args)}
    <div id="page-content">
      ${fillerHTML}
      <!-- <storybook-comment>
        <p>This story opens a dialog automatically for demo purposes.</p>
        <p>Note how it also makes use of <code>content-selector</code> prop since the <code>gup-dialog-container</code> is located before the content that it is supposed to appear on top of.</p>
      </storybook-comment> -->
    </div>
  `,
  tags: ['!autodocs'],
  args: {
    'content-selector': '#page-content',
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const container = canvasElement?.querySelector('gup-dialog-container') as DialogContainer;
    if (container) {
      container.createDialog({
        heading: 'Example Dialog',
        content:
          '<p>This dialog was opened automatically via the play function.</p><p>You can close it by clicking the X button, pressing ESC, or clicking any button below.</p>',
        actionButtons: `
          <gup-button-group>
            <gup-button appearance="secondary">Apply</gup-button>
            <gup-button appearance="text">Cancel</gup-button>
          </gup-button-group>
        `,
      });
      container.parentElement?.addEventListener('click', function (event) {
        const target = event.target as HTMLElement;
        if (target && target.tagName === 'GUP-BUTTON' && target.closest('gup-dialog')) {
          const dialog = target.closest('gup-dialog') as Dialog;
          if (dialog && container) {
            container.closeDialog(dialog);
          }
        }
      });
    }
  },
};
