import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './accordion';
import '../accordion-item/accordion-item';
import { type Accordion } from './accordion';

const { args, argTypes, template } = getWcStorybookHelpers('gup-accordion');
type Story = StoryObj<Accordion & typeof args>;

export default {
  title: 'Components/Accordion/Accordion',
  component: 'gup-accordion',
  args,
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
  },
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-accordion-item>
          <span slot="label">Click me</span>
          Some hidden content
        </gup-accordion-item>
        <gup-accordion-item>
          <span slot="label">Click me too but also saddle top buy rule river division anywhere dawn push front needed headed blanket reason yourself bigger table result replied level began mean curve air</span>
          Some other hidden content where map questions itself mood cutting ride rear story pay stood observe smell anybody tie rise greatly four visitor recently beginning source grade pig command
        </gup-accordion-item>
        <gup-accordion-item>
          <span slot="label">Slip merely pocket large no copy</span>
          Some hidden content
        </gup-accordion-item>
        <gup-accordion-item>
          <span slot="label">Crop copy ate accept anything leather fifty</span>
          Some hidden content
        </gup-accordion-item>
      `
    ),
};

export const RTL: Story = {
  render: (args) =>
    template(
      args,
      html`
      <gup-accordion-item label-show="عرض" label-hide="اخفاء">
        <span slot="label">اضغط</span>
        محتوى مخفي
      </gup-accordion-item>
      <gup-accordion-item label-show="عرض" label-hide="اخفاء">
        <span slot="label">اضغط هنا ولكن لوحة طبيعية ساحرة شمس على الجبال قمر على البحر نجوم راقصة نهر هادئ رمال ذهبية غابات كثيفة أضواء المدينة نجوم ساطعة أشجار متعانقة عصافير مغردة عائلة متكاتفة صديقان متعاونان حب غامر فرح عارم حزن عميق أمل مشرق كفاح وعزيمة تحقيق للأحلام</span>
        محتوى مخفي اخر لوحة طبيعية ساحرة شمس على الجبال قمر على البحر نجوم راقصة نهر هادئ رمال ذهبية غابات كثيفة أضواء المدينة نجوم ساطعة أشجار متعانقة عصافير مغردة عائلة متكاتفة صديقان متعاونان حب غامر فرح عارم حزن عميق أمل مشرق كفاح وعزيمة تحقيق للأحلام
      </gup-accordion-item>
    `
    ),
  parameters: {
    direction: 'rtl',
  },
};
