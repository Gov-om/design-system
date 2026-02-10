import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './toast-container';
import { type ToastContainer } from './toast-container';

import '../../button/button';
// import '../../../../.storybook/components/storybook-comment/storybook-comment';

const { args, argTypes, template } = getWcStorybookHelpers('gup-toast-container');
type Story = StoryObj<ToastContainer & typeof args>;

export default {
  title: 'Components/Toasts/Toast container',
  component: 'gup-toast-container',
  args,
  argTypes,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const fillerHTML = html`
  <div>
    <h2>This is an example text to check how the toasts behave.</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</p>
    <p>Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
    <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
    <p>Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.</p>
    <p>Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.</p>
    <p>Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
    <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum.</p>
    <p>Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris.</p>
    <p>Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue.</p>
  </div>
`;

export const Default: Story = {
  render: (args) => html`
    <gup-button class="open-toast-button" style="margin-bottom: 50px;">Open a toast</gup-button>
    ${fillerHTML}
    ${template(args)}
    <!-- <storybook-comment>
      <p>Add the <code>gup-toast-container</code> to your HTML and then use <code>addToast</code> public method to insert a toast into it.</p>
      <p>You can subscribe to <code>gup-remove</code> event (on the <code>gup-toast-container</code>) to listen for a toast removal.</p>
    </storybook-comment> -->
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        let clickCount = 0;
        const button = storyRoot.querySelector('.open-toast-button');
        if (!button) {
          throw new Error('Button not found');
        }
        button.addEventListener('gup-click', () => {
          console.log('Clicked');
          clickCount++;
          const severity = clickCount % 2 === 0 ? 'positive' : 'negative';
          storyRoot.querySelector('gup-toast-container').addToast('Count: ' + clickCount, severity, 10000);
        });
        storyRoot.addEventListener('gup-remove', (event) => {
          const el = event.detail;
          console.log('Toast removed', el);
          console.log('You have just closed a toast number', [...el.parentElement.children].indexOf(el) + 1);
        });
      })();
    </script>
  `,
};

export const WithToastOpen: Story = {
  ...Default,
  render: (args) => html`
    ${fillerHTML}
    ${template(args)}
  `,
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play: async ({ canvasElement }) => {
    await (canvasElement?.querySelector('gup-toast-container') as ToastContainer)?.addToast(
      'This is a toast message, it will hang in here for 50 seconds',
      'positive',
      50000
    );
  },
};
