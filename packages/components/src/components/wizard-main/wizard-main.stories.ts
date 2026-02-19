import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './wizard-main';
import { type WizardMain } from './wizard-main';

const { args, argTypes, template } = getWcStorybookHelpers('gup-wizard-main');
type Story = StoryObj<WizardMain & typeof args>;

export default {
  title: 'Components/Layout/Wizard main',
  component: 'gup-wizard-main',
  args: {
    ...args,
    'default-slot':
      "And remember, don't do anything that affects anything, unless it turns out you were there, and you were there, and you were there, and you were there, and you were there! And when we woke up, we had these bodies. I could clean the floors or paint a fence, or service you sexually? Bender, we're trying our best. I usually try to keep my sadness pent up inside where it can fester quietly as a mental illness. Say it in the sewer. Would you censor the Venus de Venus just because you can see her spewers? I suppose I could believe or understand that! There's only one reasonable course of action now: kill Flexo! We're also Santa Claus! And I'm his friend Jesus. Morbo will now introduce tonight's candidates… PUNY HUMAN NUMBER ONE, PUNY HUMAN NUMBER ONE, PUNY HUMAN NUMBER TWO, and Morbo's good friend, Richard Nixon. Oh, I don't want to be rescued. And I'm his friend Jesus. Morbo will now introduce tonight's candidates… PUNY HUMAN NUMBER TWO, and Morbo's good friend, Richard Nixon. Oh, I don't have time for sleeping, soldier, not with all the bed making you'll be doing. And remember, don't do anything that affects anything, unless it turns out you were there! And when we woke up, we had these bodies. I could clean the floors or paint a fence, or service you sexually? Bender, we're trying our best.",
  },
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};
