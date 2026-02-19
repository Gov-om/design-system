import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../components/button/button';
import '../../components/button-group/button-group';
import '../../components/input-field/input-field';
import '../../components/link/link';
import '../../components/form-list/form-list';
import '../../components/form-section/form-section';
import '../../components/table/table/table';
import '../../components/table/table-row/table-row';
import '../../components/table/table-cell/table-cell';
import '../../components/screenreader-text/screenreader-text';

export default {
  title: 'Patterns/Add Row',
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: StoryObj = {
  render: () => html`
    <gup-form-section>
      <span slot="title">Table</span>
      <gup-table>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header"><gup-screenreader-text>Actions</gup-screenreader-text></gup-table-cell>
        <gup-table-row>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>
            <gup-link kind="button">Remove</gup-link>
          </gup-table-cell>
        </gup-table-row>
      </gup-table>
    </gup-form-section>

    <gup-form-section>
      <span slot="title">Add Row</span>
      <gup-form-list>
        <gup-input-field name="field-1" type="text">
          Field Title
        </gup-input-field>
        <gup-input-field name="field-2" type="text">
          Field Title
        </gup-input-field>
        <gup-input-field name="field-3" type="text">
          Field Title
        </gup-input-field>
      </gup-form-list>
      <gup-button-group slot="footer" direction="horizontal">
        <gup-button appearance="primary">Add row</gup-button>
        <gup-button appearance="text">Cancel</gup-button>
      </gup-button-group>
    </gup-form-section>
  `,
};

export const WithData: StoryObj = {
  render: () => html`
    <gup-form-section>
      <span slot="title">Table</span>
      <gup-table>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header"><gup-screenreader-text>Actions</gup-screenreader-text></gup-table-cell>
        <gup-table-row>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>
            <gup-link kind="button">Remove</gup-link>
          </gup-table-cell>
        </gup-table-row>
      </gup-table>
    </gup-form-section>

    <gup-form-section>
      <span slot="title">Add Row</span>
      <gup-form-list>
        <gup-input-field name="field-1" type="text" value="Data">
          Field Title
        </gup-input-field>
        <gup-input-field name="field-2" type="text" value="Data">
          Field Title
        </gup-input-field>
        <gup-input-field name="field-3" type="text" value="Data">
          Field Title
        </gup-input-field>
      </gup-form-list>
      <gup-button-group slot="footer" direction="horizontal">
        <gup-button appearance="primary">Add row</gup-button>
        <gup-button appearance="text">Cancel</gup-button>
      </gup-button-group>
    </gup-form-section>
  `,
};

export const MultipleRows: StoryObj = {
  render: () => html`
    <gup-form-section>
      <span slot="title">Table</span>
      <gup-table>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header">Title</gup-table-cell>
        <gup-table-cell type="header"><gup-screenreader-text>Actions</gup-screenreader-text></gup-table-cell>
        <gup-table-row>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>
            <gup-link kind="button">Remove</gup-link>
          </gup-table-cell>
        </gup-table-row>
        <gup-table-row>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>Data</gup-table-cell>
          <gup-table-cell>
            <gup-link kind="button">Remove</gup-link>
          </gup-table-cell>
        </gup-table-row>
      </gup-table>
    </gup-form-section>

    <gup-form-section>
      <span slot="title">Add Row</span>
      <gup-form-list>
        <gup-input-field name="field-1" type="text">
          Field Title
        </gup-input-field>
        <gup-input-field name="field-2" type="text">
          Field Title
        </gup-input-field>
        <gup-input-field name="field-3" type="text">
          Field Title
        </gup-input-field>
      </gup-form-list>
      <gup-button-group slot="footer" direction="horizontal">
        <gup-button appearance="primary">Add row</gup-button>
        <gup-button appearance="text">Cancel</gup-button>
      </gup-button-group>
    </gup-form-section>
  `,
};
