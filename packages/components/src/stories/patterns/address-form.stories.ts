import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../components/input-field/input-field';
import '../../components/dropdown/dropdown-field/dropdown-field';
import '../../components/dropdown/dropdown-menu/dropdown-menu';
import '../../components/dropdown/dropdown-menu-item/dropdown-menu-item';
import '../../components/form-list/form-list';
import '../../components/form-section/form-section';

export default {
  title: 'Patterns/Address Form',
  parameters: {
    layout: 'padded',
  },
} as Meta;

type Option = {
  label: string;
  value: string;
};

type AddressLabels = {
  title: string;
  governorate: string;
  governoratePlaceholder: string;
  governorates: Option[];
  wilayat: string;
  wilayatPlaceholder: string;
  wilayats: Option[];
  area: string;
  wayNumber: string;
  houseNumber: string;
  additionalDirections: string;
};

const enLabels: AddressLabels = {
  title: 'What is your address',
  governorate: 'Governorate',
  governoratePlaceholder: 'Select governorate',
  governorates: [
    { label: 'Muscat', value: 'muscat' },
    { label: 'Dhofar', value: 'dhofar' },
    { label: 'Musandam', value: 'musandam' },
    { label: 'Al Buraimi', value: 'al-buraimi' },
    { label: 'Ad Dakhiliyah', value: 'ad-dakhiliyah' },
    { label: 'Al Batinah North', value: 'al-batinah-north' },
    { label: 'Al Batinah South', value: 'al-batinah-south' },
    { label: 'Ash Sharqiyah North', value: 'ash-sharqiyah-north' },
    { label: 'Ash Sharqiyah South', value: 'ash-sharqiyah-south' },
    { label: 'Ad Dhahirah', value: 'ad-dhahirah' },
    { label: 'Al Wusta', value: 'al-wusta' },
  ],
  wilayat: 'Wilayat',
  wilayatPlaceholder: 'Select wilayat',
  wilayats: [
    { label: 'Muscat', value: 'muscat' },
    { label: 'Muttrah', value: 'muttrah' },
    { label: 'Bawshar', value: 'bawshar' },
    { label: 'Seeb', value: 'seeb' },
    { label: 'Al Amarat', value: 'al-amarat' },
    { label: 'Quriyat', value: 'quriyat' },
  ],
  area: 'Area / Neighbourhood',
  wayNumber: 'Way Number / Landmark',
  houseNumber: 'House / Building Number',
  additionalDirections: 'Additional directions',
};

const arLabels: AddressLabels = {
  title: 'ما هو عنوانك',
  governorate: 'المحافظة',
  governoratePlaceholder: 'اختر المحافظة',
  governorates: [
    { label: 'مسقط', value: 'muscat' },
    { label: 'ظفار', value: 'dhofar' },
    { label: 'مسندم', value: 'musandam' },
    { label: 'البريمي', value: 'al-buraimi' },
    { label: 'الداخلية', value: 'ad-dakhiliyah' },
    { label: 'شمال الباطنة', value: 'al-batinah-north' },
    { label: 'جنوب الباطنة', value: 'al-batinah-south' },
    { label: 'شمال الشرقية', value: 'ash-sharqiyah-north' },
    { label: 'جنوب الشرقية', value: 'ash-sharqiyah-south' },
    { label: 'الظاهرة', value: 'ad-dhahirah' },
    { label: 'الوسطى', value: 'al-wusta' },
  ],
  wilayat: 'الولاية',
  wilayatPlaceholder: 'اختر الولاية',
  wilayats: [
    { label: 'مسقط', value: 'muscat' },
    { label: 'مطرح', value: 'muttrah' },
    { label: 'بوشر', value: 'bawshar' },
    { label: 'السيب', value: 'seeb' },
    { label: 'العامرات', value: 'al-amarat' },
    { label: 'قريات', value: 'quriyat' },
  ],
  area: 'المنطقة / الحي',
  wayNumber: 'رقم الطريق / علامة مميزة',
  houseNumber: 'رقم المنزل / المبنى',
  additionalDirections: 'إرشادات إضافية',
};

const options = (items: Option[]) => items.map((item) => html` <gup-dropdown-menu-item label="${item.label}" value="${item.value}"></gup-dropdown-menu-item> `);

const renderAddressForm = (t: AddressLabels) => html`
  <gup-form-section>
    <span slot="title">${t.title}</span>
    <gup-form-list>
      <gup-dropdown-field name="governorate" placeholder="${t.governoratePlaceholder}">
        <span slot="label">${t.governorate}</span>
        <gup-dropdown-menu> ${options(t.governorates)} </gup-dropdown-menu>
      </gup-dropdown-field>
      <gup-dropdown-field name="wilayat" placeholder="${t.wilayatPlaceholder}">
        <span slot="label">${t.wilayat}</span>
        <gup-dropdown-menu> ${options(t.wilayats)} </gup-dropdown-menu>
      </gup-dropdown-field>
      <gup-input-field name="area" type="text"> ${t.area} </gup-input-field>
      <gup-input-field name="way-number" type="text"> ${t.wayNumber} </gup-input-field>
      <gup-input-field name="house-number" type="text"> ${t.houseNumber} </gup-input-field>
      <gup-input-field name="additional-directions" type="text"> ${t.additionalDirections} </gup-input-field>
    </gup-form-list>
  </gup-form-section>
`;

export const Default: StoryObj = {
  render: () => renderAddressForm(enLabels),
};

export const RTL: StoryObj = {
  render: () => renderAddressForm(arLabels),
  parameters: {
    direction: 'rtl',
  },
};
