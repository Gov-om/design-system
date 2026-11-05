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

type AddRowLabels = {
  table: string;
  columnTitle: string;
  actions: string;
  data: string;
  remove: string;
  addRowSection: string;
  fieldTitle: string;
  addRow: string;
  cancel: string;
};

const enLabels: AddRowLabels = {
  table: 'Table',
  columnTitle: 'Title',
  actions: 'Actions',
  data: 'Data',
  remove: 'Remove',
  addRowSection: 'Add Row',
  fieldTitle: 'Field Title',
  addRow: 'Add row',
  cancel: 'Cancel',
};

const arLabels: AddRowLabels = {
  table: 'الجدول',
  columnTitle: 'العنوان',
  actions: 'الإجراءات',
  data: 'بيانات',
  remove: 'إزالة',
  addRowSection: 'إضافة صف',
  fieldTitle: 'عنوان الحقل',
  addRow: 'إضافة صف',
  cancel: 'إلغاء',
};

const dataRow = (t: AddRowLabels) => html`
  <gup-table-row>
    <gup-table-cell>${t.data}</gup-table-cell>
    <gup-table-cell>${t.data}</gup-table-cell>
    <gup-table-cell>${t.data}</gup-table-cell>
    <gup-table-cell>
      <gup-link kind="button">${t.remove}</gup-link>
    </gup-table-cell>
  </gup-table-row>
`;

const tableSection = (t: AddRowLabels, rowCount: number) => html`
  <gup-form-section>
    <span slot="title">${t.table}</span>
    <gup-table>
      <gup-table-cell type="header">${t.columnTitle}</gup-table-cell>
      <gup-table-cell type="header">${t.columnTitle}</gup-table-cell>
      <gup-table-cell type="header">${t.columnTitle}</gup-table-cell>
      <gup-table-cell type="header"><gup-screenreader-text>${t.actions}</gup-screenreader-text></gup-table-cell>
      ${Array.from({ length: rowCount }, () => dataRow(t))}
    </gup-table>
  </gup-form-section>
`;

const addRowSection = (t: AddRowLabels, filled: boolean) => html`
  <gup-form-section>
    <span slot="title">${t.addRowSection}</span>
    <gup-form-list>
      <gup-input-field name="field-1" type="text" value="${filled ? t.data : ''}"> ${t.fieldTitle} </gup-input-field>
      <gup-input-field name="field-2" type="text" value="${filled ? t.data : ''}"> ${t.fieldTitle} </gup-input-field>
      <gup-input-field name="field-3" type="text" value="${filled ? t.data : ''}"> ${t.fieldTitle} </gup-input-field>
    </gup-form-list>
    <gup-button-group slot="footer" direction="horizontal">
      <gup-button appearance="primary">${t.addRow}</gup-button>
      <gup-button appearance="text">${t.cancel}</gup-button>
    </gup-button-group>
  </gup-form-section>
`;

const renderAddRow = (t: AddRowLabels, { rowCount = 1, filled = false } = {}) => html`
  ${tableSection(t, rowCount)} ${addRowSection(t, filled)}
`;

export const Default: StoryObj = {
  render: () => renderAddRow(enLabels),
};

export const WithData: StoryObj = {
  render: () => renderAddRow(enLabels, { filled: true }),
};

export const MultipleRows: StoryObj = {
  render: () => renderAddRow(enLabels, { rowCount: 2 }),
};

export const RTL: StoryObj = {
  render: () => renderAddRow(arLabels, { rowCount: 2 }),
  parameters: {
    direction: 'rtl',
  },
};
