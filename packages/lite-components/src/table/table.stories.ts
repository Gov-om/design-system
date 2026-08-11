import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupTableClasses } from './table';

import './table.css';
import '../../../components/src/components/table/table/table';
import '../../../components/src/components/table/table-row/table-row';
import '../../../components/src/components/table/table-cell/table-cell';

type Story = StoryObj;

export default {
  title: 'Lite Components - WIP/Table',
  tags: ['autodocs', 'BETA'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Table

An alternative to the \`<gup-table>\` / \`<gup-table-row>\` / \`<gup-table-cell>\` web components for projects that prefer native HTML.

Uses semantic \`<table>\`, \`<thead>\`, \`<tbody>\`, \`<tr>\`, \`<th>\`, and \`<td>\` elements. No JavaScript required.

> The web component uses ARIA-role divs to work around Shadow DOM slot constraints. The Lite version uses proper native table elements, which is semantically cleaner and requires no JavaScript.

### Usage

\`\`\`html
<table class="gup-table">
  <thead class="gup-table__head">
    <tr class="gup-table__row">
      <th class="gup-table__header" scope="col">Document</th>
      <th class="gup-table__header" scope="col">Type</th>
      <th class="gup-table__header" scope="col">Required</th>
    </tr>
  </thead>
  <tbody class="gup-table__body">
    <tr class="gup-table__row">
      <td class="gup-table__cell">National ID</td>
      <td class="gup-table__cell">Identity</td>
      <td class="gup-table__cell">Yes</td>
    </tr>
  </tbody>
</table>
\`\`\`

### Row headers

Use \`<th scope="row">\` for row header cells inside \`<tbody>\`:

\`\`\`html
<tr class="gup-table__row">
  <th class="gup-table__header" scope="row">Section A</th>
  <td class="gup-table__cell">Value 1</td>
  <td class="gup-table__cell">Value 2</td>
</tr>
\`\`\`

### Available classes

| Class | Element | Description |
|---|---|---|
| \`.gup-table\` | \`<table>\` | Base class (required) |
| \`.gup-table__head\` | \`<thead>\` | Table header section |
| \`.gup-table__body\` | \`<tbody>\` | Table body section |
| \`.gup-table__row\` | \`<tr>\` | A table row |
| \`.gup-table__header\` | \`<th>\` | Column or row header cell - bold text |
| \`.gup-table__cell\` | \`<td>\` | Body data cell |
        `,
      },
    },
  },
} as Meta;

/**
 * A standard table with column headers and body rows.
 */
export const Default: Story = {
  render: () => html`
    <table class="${gupTableClasses.base}">
      <thead class="${gupTableClasses.head}">
        <tr class="${gupTableClasses.row}">
          <th class="${gupTableClasses.header}" scope="col">Document</th>
          <th class="${gupTableClasses.header}" scope="col">Type</th>
          <th class="${gupTableClasses.header}" scope="col">Required</th>
          <th class="${gupTableClasses.header}" scope="col">Notes</th>
        </tr>
      </thead>
      <tbody class="${gupTableClasses.body}">
        <tr class="${gupTableClasses.row}">
          <td class="${gupTableClasses.cell}">National ID card</td>
          <td class="${gupTableClasses.cell}">Identity</td>
          <td class="${gupTableClasses.cell}">Yes</td>
          <td class="${gupTableClasses.cell}">Must be valid and not expired</td>
        </tr>
        <tr class="${gupTableClasses.row}">
          <td class="${gupTableClasses.cell}">Passport</td>
          <td class="${gupTableClasses.cell}">Identity</td>
          <td class="${gupTableClasses.cell}">No</td>
          <td class="${gupTableClasses.cell}">Required if applying from outside Oman</td>
        </tr>
        <tr class="${gupTableClasses.row}">
          <td class="${gupTableClasses.cell}">Proof of residence</td>
          <td class="${gupTableClasses.cell}">Address</td>
          <td class="${gupTableClasses.cell}">Yes</td>
          <td class="${gupTableClasses.cell}">Utility bill or municipality letter dated within 3 months</td>
        </tr>
        <tr class="${gupTableClasses.row}">
          <td class="${gupTableClasses.cell}">Bank statement</td>
          <td class="${gupTableClasses.cell}">Financial</td>
          <td class="${gupTableClasses.cell}">Yes</td>
          <td class="${gupTableClasses.cell}">Last 3 months, certified by the bank</td>
        </tr>
      </tbody>
    </table>
  `,
};

/**
 * Row headers label each row using `<th scope="row">` inside `<tbody>`. No `<thead>` needed.
 */
export const WithRowHeaders: Story = {
  render: () => html`
    <table class="${gupTableClasses.base}">
      <tbody class="${gupTableClasses.body}">
        <tr class="${gupTableClasses.row}">
          <th class="${gupTableClasses.header}" scope="row">Initial review</th>
          <td class="${gupTableClasses.cell}">1–3 business days</td>
          <td class="${gupTableClasses.cell}">Applications team</td>
        </tr>
        <tr class="${gupTableClasses.row}">
          <th class="${gupTableClasses.header}" scope="row">Document verification</th>
          <td class="${gupTableClasses.cell}">3–5 business days</td>
          <td class="${gupTableClasses.cell}">Compliance department</td>
        </tr>
        <tr class="${gupTableClasses.row}">
          <th class="${gupTableClasses.header}" scope="row">Final approval</th>
          <td class="${gupTableClasses.cell}">1–2 business days</td>
          <td class="${gupTableClasses.cell}">Senior officer</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const RTL: Story = {
  render: () => html`
    <table class="${gupTableClasses.base}">
      <thead class="${gupTableClasses.head}">
        <tr class="${gupTableClasses.row}">
          <th class="${gupTableClasses.header}" scope="col">المستند</th>
          <th class="${gupTableClasses.header}" scope="col">النوع</th>
          <th class="${gupTableClasses.header}" scope="col">مطلوب</th>
        </tr>
      </thead>
      <tbody class="${gupTableClasses.body}">
        <tr class="${gupTableClasses.row}">
          <td class="${gupTableClasses.cell}">بطاقة الهوية الوطنية</td>
          <td class="${gupTableClasses.cell}">هوية</td>
          <td class="${gupTableClasses.cell}">نعم</td>
        </tr>
        <tr class="${gupTableClasses.row}">
          <td class="${gupTableClasses.cell}">جواز السفر</td>
          <td class="${gupTableClasses.cell}">هوية</td>
          <td class="${gupTableClasses.cell}">لا</td>
        </tr>
        <tr class="${gupTableClasses.row}">
          <td class="${gupTableClasses.cell}">إثبات الإقامة</td>
          <td class="${gupTableClasses.cell}">عنوان</td>
          <td class="${gupTableClasses.cell}">نعم</td>
        </tr>
      </tbody>
    </table>
  `,
  parameters: {
    direction: 'rtl',
  },
};

/**
 * The Lite table (native `<table>`) side by side with the web component version
 * (ARIA-role divs). Both should look identical.
 */
export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Class-based (lite) - native &lt;table&gt;</h4>
        <table class="${gupTableClasses.base}">
          <thead class="${gupTableClasses.head}">
            <tr class="${gupTableClasses.row}">
              <th class="${gupTableClasses.header}" scope="col">Header 1</th>
              <th class="${gupTableClasses.header}" scope="col">Header 2</th>
              <th class="${gupTableClasses.header}" scope="col">Header 3</th>
            </tr>
          </thead>
          <tbody class="${gupTableClasses.body}">
            <tr class="${gupTableClasses.row}">
              <td class="${gupTableClasses.cell}">Data 1</td>
              <td class="${gupTableClasses.cell}">Data 2</td>
              <td class="${gupTableClasses.cell}">Data 3</td>
            </tr>
            <tr class="${gupTableClasses.row}">
              <td class="${gupTableClasses.cell}">Data 4</td>
              <td class="${gupTableClasses.cell}">Data 5</td>
              <td class="${gupTableClasses.cell}">Data 6</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Web Component - ARIA-role divs</h4>
        <gup-table>
          <gup-table-cell type="header">Header 1</gup-table-cell>
          <gup-table-cell type="header">Header 2</gup-table-cell>
          <gup-table-cell type="header">Header 3</gup-table-cell>
          <gup-table-row>
            <gup-table-cell>Data 1</gup-table-cell>
            <gup-table-cell>Data 2</gup-table-cell>
            <gup-table-cell>Data 3</gup-table-cell>
          </gup-table-row>
          <gup-table-row>
            <gup-table-cell>Data 4</gup-table-cell>
            <gup-table-cell>Data 5</gup-table-cell>
            <gup-table-cell>Data 6</gup-table-cell>
          </gup-table-row>
        </gup-table>
      </div>
    </div>
  `,
};
