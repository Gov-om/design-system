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

const governorateItems = html`
  <gup-dropdown-menu-item label="Muscat" value="muscat"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Dhofar" value="dhofar"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Musandam" value="musandam"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Al Buraimi" value="al-buraimi"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Ad Dakhiliyah" value="ad-dakhiliyah"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Al Batinah North" value="al-batinah-north"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Al Batinah South" value="al-batinah-south"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Ash Sharqiyah North" value="ash-sharqiyah-north"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Ash Sharqiyah South" value="ash-sharqiyah-south"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Ad Dhahirah" value="ad-dhahirah"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Al Wusta" value="al-wusta"></gup-dropdown-menu-item>
`;

const wilayatItems = html`
  <gup-dropdown-menu-item label="Muscat" value="muscat"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Muttrah" value="muttrah"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Bawshar" value="bawshar"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Seeb" value="seeb"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Al Amarat" value="al-amarat"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Quriyat" value="quriyat"></gup-dropdown-menu-item>
`;

export const Default: StoryObj = {
  render: () => html`
    <gup-form-section>
      <span slot="title">What is your address</span>
      <gup-form-list>
        <gup-dropdown-field name="governorate" placeholder="Select governorate">
          <span slot="label">Governorate</span>
          <gup-dropdown-menu>
            ${governorateItems}
          </gup-dropdown-menu>
        </gup-dropdown-field>
        <gup-dropdown-field name="wilayat" placeholder="Select wilayat">
          <span slot="label">Wilayat</span>
          <gup-dropdown-menu>
            ${wilayatItems}
          </gup-dropdown-menu>
        </gup-dropdown-field>
        <gup-input-field name="area" type="text">
          Area / Neighbourhood
        </gup-input-field>
        <gup-input-field name="way-number" type="text">
          Way Number / Landmark
        </gup-input-field>
        <gup-input-field name="house-number" type="text">
          House / Building Number
        </gup-input-field>
        <gup-input-field name="additional-directions" type="text">
          Additional directions
        </gup-input-field>
      </gup-form-list>
    </gup-form-section>
  `,
};
