import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../../button/button';
import '../../icon/icon';
import '../../details/details';
import './stepper';
import '../stepper-item/stepper-item';
import { type Stepper } from './stepper';
import { StepperItem } from '../stepper-item/stepper-item';

const { args, argTypes, template } = getWcStorybookHelpers('gup-stepper');
type Story = StoryObj<Stepper & typeof args>;

export default {
  title: 'Components/Stepper/Stepper',
  component: 'gup-stepper',
  args,
  argTypes: {
    ...argTypes,
    'default-slot': {
      control: false,
    },
  },
  parameters: {
    layout: 'padded',
  },
} as Meta;

const slotContent = html`
  <gup-stepper-item step-number="1" step-type="done">
    <span slot="label">Step 1</span>
    Step 1 content
  </gup-stepper-item>
  <gup-stepper-item step-number="2" step-type="selected">
    <span slot="label">Step 2</span>
    Step 2 content carefully joy older point pure halfway mirror touch cent by yourself pleasure chose figure fifteen cage cook rain discussion been hearing think expect bee
  </gup-stepper-item>
  <gup-stepper-item step-number="3">
    <span slot="label">Step 3</span>
    Step 3 content
  </gup-stepper-item>
  <gup-stepper-item step-number="4.5" step-type="and">
    <span slot="label">Step 4.5</span>
    Step 4.5 content
  </gup-stepper-item>
  <gup-stepper-item step-number="5">
    <span slot="label">Step 5</span>
    Step 5 content
  </gup-stepper-item>
`;

const slotLabelsOnly = html`
  <gup-stepper-item step-number="1" step-type="done">
    <span slot="label">Step 1</span>
  </gup-stepper-item>
  <gup-stepper-item step-number="2" step-type="selected">
    <span slot="label">Step 2 with some words that can cause the label to span many many many lines</span>
  </gup-stepper-item>
  <gup-stepper-item step-number="3">
    <span slot="label">Step 3</span>
  </gup-stepper-item>
  <gup-stepper-item step-number="5">
    <span slot="label">Step 5 with some words that can cause the label to span many many many lines</span>
  </gup-stepper-item>
`;

export const Default: Story = {
  render: (args) => template(args, slotContent),
};

export const WithToggleAllButton: Story = {
  ...Default,
  args: {
    'toggle-all-displayed': true,
  },
};

export const ControlledState: Story = {
  render: (args) => html`
    <button class="toggle">
      Toggle step 3
    </button>
    ${template(args, slotContent)}
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('.toggle').addEventListener('click', (event) => {
        const stepper = storyRoot.querySelector('gup-stepper');
        const items = stepper.querySelectorAll('gup-stepper-item');
        items[2].open = !items[2].open;
      });
      })();
    </script>
  `,
  play: async ({ canvasElement }) => {
    const stepper = canvasElement.querySelector('gup-stepper');
    const items = stepper?.querySelectorAll('gup-stepper-item');
    if (items) {
      (items[2] as StepperItem).open = true;
    }
  },
};

export const RTL: Story = {
  render: (args) =>
    template(
      args,
      html`
      <gup-stepper-item label-show="عرض" label-hide="اخفاء" step-number="1" step-type="done">
        <span slot="label">الخطوة 1</span>
        محتوى الخطوة 1
      </gup-stepper-item>
      <gup-stepper-item label-show="عرض" label-hide="اخفاء" step-number="2" step-type="selected">
        <span slot="label">الخطوة 2</span>
        محتوى الخطوة 2
      </gup-stepper-item>
      <gup-stepper-item label-show="عرض" label-hide="اخفاء" step-number="3">
        <span slot="label">الخطوة 3</span>
        محتوى الخطوة 3
      </gup-stepper-item>
      <gup-stepper-item label-show="عرض" label-hide="اخفاء" step-number="4">
        <span slot="label">الخطوة 4</span>
        محتوى الخطوة 4
      </gup-stepper-item>
      <gup-stepper-item label-show="عرض" label-hide="اخفاء" label-and="ايضا" step-number="4.5" step-type="and">
        <span slot="label">الخطوة 4 ونصف</span>
        محتوى الخطوة 4 ونصف
      </gup-stepper-item>
      <gup-stepper-item label-show="عرض" label-hide="اخفاء" step-number="5">
        <span slot="label">الخطوة 5</span>
        محتوى الخطوة 5
      </gup-stepper-item>
      `
    ),
  parameters: {
    direction: 'rtl',
  },
};

export const WizardMode: Story = {
  render: (args) => template(args, slotContent),
  args: {
    'wizard-mode': true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const StaticMode: Story = {
  render: (args) => template(args, slotLabelsOnly),
  args: {
    'static-mode': true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const StaticModeContinued: Story = {
  render: (args) => template(args, slotLabelsOnly),
  args: {
    'static-mode': true,
    continued: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const StaticModeWithDetails: Story = {
  render: (args) => html`
    <gup-details open content-appearance="sink" closed-icon="add-circle" open-icon="remove-circle">
      <span slot="label">Step 1</span>
      ${template(args, slotLabelsOnly)}
    </gup-details>
  `,
  args: {
    'static-mode': true,
  },
  parameters: {
    layout: 'padded',
  },
};
