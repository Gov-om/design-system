import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../stepper/stepper';
import '../stepper-item/stepper-item';
import { type StepperItem } from './stepper-item';
import { html } from 'lit';

const { argTypes, args, template } = getWcStorybookHelpers('gup-stepper-item');
type Story = StoryObj<StepperItem & typeof args>;

export default {
  title: 'Components/Stepper/Stepper item',
  component: 'gup-stepper-item',
  argTypes,
  args: {
    ...args,
    'default-slot': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    'label-slot': 'Title of the step - change me with the controls below',
    'step-number': '1',
  },
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-stepper>
      ${template(args)}
      <gup-stepper-item step-number="2">
        <span slot="label">Step 2</span>
        Step 2 content
      </gup-stepper-item>
      <gup-stepper-item step-number="3">
        <span slot="label">Step 3 with fifteen breath partly earth finger raise height research fully unless stepped</span>
        Step 2 has avoid birds poet seen where guess carry including everywhere atomic distant underline rush forgotten while final but human she along duck wooden done
      </gup-stepper-item>
    </gup-stepper>
  `,
};

export const Done: Story = {
  ...Default,
  args: {
    'step-type': 'done',
  },
};

export const Selected: Story = {
  ...Default,
  args: {
    'step-type': 'selected',
  },
};

export const And: Story = {
  ...Default,
  render: (args) => html`
    <gup-stepper>
      <gup-stepper-item step-number="1">
        <span slot="label">Step 1</span>
        Step 1 content
      </gup-stepper-item>
      ${template(args)}
      <gup-stepper-item step-number="3">
        <span slot="label">Step 3 with fifteen breath partly earth finger raise height research fully unless stepped</span>
        Step 2 has avoid birds poet seen where guess carry including everywhere atomic distant underline rush forgotten while final but human she along duck wooden done
      </gup-stepper-item>
    </gup-stepper>
  `,
  args: {
    'step-number': '2',
    'step-type': 'and',
  },
};

export const Open: Story = {
  ...Default,
  args: {
    open: true,
  },
};
