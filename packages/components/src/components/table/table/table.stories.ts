import { html, TemplateResult } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import { applyBreakpoint } from '../../../../.storybook/utils';

import './table';
import '../table-cell/table-cell';
import '../../screenreader-text/screenreader-text';
import '../../badge-chip/badge-chip';
import '../../track/track';
import '../../pagination/pagination';
import '../table-row/table-row';
import '../../dropdown/dropdown-field/dropdown-field';
import '../../dropdown/dropdown-menu/dropdown-menu';
import '../../dropdown/dropdown-menu-item/dropdown-menu-item';
import '../../radio-button/radio-button';
// import '../../../../.storybook/components/storybook-comment/storybook-comment';
import { type Table } from './table';

const { args, argTypes, template, events } = getWcStorybookHelpers('gup-table');
type Story = StoryObj<Table & typeof args>;

export default {
  title: 'Components/Table/Table',
  component: 'gup-table',
  args,
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
  },
  parameters: {
    actions: {
      handles: events,
    },
  },
} as Meta;

const simpleTableTemplate: TemplateResult = html`
  <gup-table-cell type="header">Header 1</gup-table-cell>
  <gup-table-cell type="header">Header 2</gup-table-cell>
  <gup-table-cell type="header">Header 3</gup-table-cell>
  <gup-table-row>
    <gup-table-cell>Data 1 visit sail include equally birth come attack play mother garden him select go number major collect cap brave giving creature mix soil pass orbit</gup-table-cell>
    <gup-table-cell>Data 2 because do model represent actually driving observe troops bit furniture failed sure desk rise greatest review mirror finest mathematics locate dried native drawn believed</gup-table-cell>
    <gup-table-cell>Data 3</gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>Data 4</gup-table-cell>
    <gup-table-cell>Data 5 show fifty visitor shaking recall help reason evening nature hit on information couple free write active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</gup-table-cell>
    <gup-table-cell>Data 6</gup-table-cell>
  </gup-table-row>
`;

export const Default: Story = {
  render: (args) => template(args, simpleTableTemplate),
};

export const Mobile: Story = {
  ...Default,
  ...applyBreakpoint('xsmall'),
};

export const RTL: Story = {
  render: (args) =>
    template(
      args,
      html`
      <gup-table-cell type="header">عنوان ١</gup-table-cell>
      <gup-table-cell type="header">عنوان ٢</gup-table-cell>
      <gup-table-cell type="header">عنوان ٣</gup-table-cell>
      <gup-table-row>
        <gup-table-cell>البيانات ١ زيارة شراع تتضمن على حد سواء ولادة تأتي هجوم لعب الأم جاردين هو اختيار الذهاب رقم رئيسي جمع غطاء شجاع إعطاء المخلوق خلط التربة تمرير مدار</gup-table-cell>
        <gup-table-cell>البيانات ٢ لأن النموذج يمثل القيادة الفعلية تراقب القوات قليلاً الأثاث فشلت متأكدة المكتب يرتفع أعظم استعراض مرآة أدق الرياضيات تحديد الأصل الجاف الأصلي رسم يعتقد</gup-table-cell>
        <gup-table-cell>البيانات ٣</gup-table-cell>
      </gup-table-row>
      <gup-table-row>
        <gup-table-cell>البيانات ٤</gup-table-cell>
        <gup-table-cell>البيانات ٥ تظهر خمسين زائر هزاز إعادة مساعدة سبب مساء الطبيعة ضرب على معلومات الزوج حرة كتابة الأعضاء النشطين ينفقون ضربة إذا لمس الرأي على النحو الأكثر احتمالاً الرأي النموذجي مع بعض الإرهاق في بعض الأحداث</gup-table-cell>
        <gup-table-cell>البيانات ٦</gup-table-cell>
      </gup-table-row>
    `
    ),
  parameters: {
    direction: 'rtl',
  },
};

export const NextToARegularTable: Story = {
  ...Default,
  render: (args) => html`
    A regular table – natively accessible
    <table class="table">
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1 visit sail include equally birth come attack play mother garden him select go number major collect cap brave giving creature mix soil pass orbit</td>
          <td>Data 2 because do model represent actually driving observe troops bit furniture failed sure desk rise greatest review mirror finest mathematics locate dried native drawn believed</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>Data 4</td>
          <td>Data 5 show fifty visitor shaking recall help reason evening nature hit on information couple free write active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</td>
          <td>Data 6</td>
        </tr>
      </tbody>
    </table>
    A GUP table - built with ARIA
    ${template(args, simpleTableTemplate)}
  `,
};

export const TableWithRowHeaders: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-table-row>
          <gup-table-cell type="rowheader">Row 1</gup-table-cell>
          <gup-table-cell>Data 2 because do model represent actually driving observe troops bit furniture failed sure desk rise greatest review mirror finest mathematics locate dried native drawn believed</gup-table-cell>
          <gup-table-cell>Data 1</gup-table-cell>
        </gup-table-row>
        <gup-table-row>
          <gup-table-cell type="rowheader">Row 2</gup-table-cell>
          <gup-table-cell>Data 5 show fifty visitor shaking recall help reason evening nature hit on information couple free write active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</gup-table-cell>
          <gup-table-cell>Data 2</gup-table-cell>
        </gup-table-row>
        <gup-table-row>
          <gup-table-cell type="rowheader">Row 3</gup-table-cell>
          <gup-table-cell>Active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</gup-table-cell>
          <gup-table-cell>Data 3</gup-table-cell>
        </gup-table-row>
      `
    )}
  `,
};

export const WithCustomHTMLInCells: Story = {
  render: (args) => html`
    <gup-radio-button-group>
      ${template(
        args,
        html`
          <gup-table-cell type="header">Header 1</gup-table-cell>
          <gup-table-cell type="header">Header 2</gup-table-cell>
          <gup-table-cell type="header">Header 3</gup-table-cell>
          <gup-table-row>
            <gup-table-cell>
              <gup-radio-button name="radios" value="radio-1" size="s">
                This is the label for the radio button in the first cell
              </gup-radio-button>
          </gup-table-cell>
          <gup-table-cell>
            Data 2 because do model represent actually driving observe troops bit furniture failed sure desk rise greatest review mirror finest mathematics locate dried native drawn believed
          </gup-table-cell>
          <gup-table-cell>
            Data 3
          </gup-table-cell>
          </gup-table-row>
          <gup-table-row>
            <gup-table-cell>
              <gup-radio-button name="radios" value="radio-2" size="s">
                Clay quickly lake certainly unit field
              </gup-radio-button>
          </gup-table-cell>
          <gup-table-cell>
            Data 2 because apartment breathing century satisfied operation
          </gup-table-cell>
          <gup-table-cell>
            Data 3
          </gup-table-cell>
          </gup-table-row>
          </gup-table-row>
          <gup-table-row>
            <gup-table-cell>
              <gup-dropdown-field name="cell1" placeholder="Select an item">
                <gup-screenreader-text slot="label">Here a dropdown should appear:</gup-screenreader-text>
                <gup-dropdown-menu>
                  <gup-dropdown-menu-item label="Item number 1" value="item1"></gup-dropdown-menu-item>
                  <gup-dropdown-menu-item label="Item 2" value="item2"></gup-dropdown-menu-item>
                </gup-dropdown-menu>
              </gup-dropdown-field>
            </gup-table-cell>
            <gup-table-cell>
              <gup-dropdown-field name="cell2" placeholder="Select an item">
                <gup-screenreader-text slot="label">Another dropdown:</gup-screenreader-text>
                <gup-dropdown-menu>
                  <gup-dropdown-menu-item label="Item number 1" value="item1"></gup-dropdown-menu-item>
                  <gup-dropdown-menu-item label="Item 2" value="item2"></gup-dropdown-menu-item>
                </gup-dropdown-menu>
              </gup-dropdown-field>
            </gup-table-cell>
            <gup-table-cell>
              <gup-dropdown-field name="cell3" placeholder="Select an item">
                <gup-screenreader-text slot="label">Yet another dropdown:</gup-screenreader-text>
                <gup-dropdown-menu>
                  <gup-dropdown-menu-item label="Item number 1" value="item1"></gup-dropdown-menu-item>
                  <gup-dropdown-menu-item label="Item 2" value="item2"></gup-dropdown-menu-item>
                </gup-dropdown-menu>
              </gup-dropdown-field>
            </gup-table-cell>
          </gup-table-row>
          <gup-table-row>
            <gup-table-cell>Data 4</gup-table-cell>
            <gup-table-cell>Data 5 show fifty visitor shaking recall help reason evening nature hit on information couple free write active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</gup-table-cell>
            <gup-table-cell>
              <gup-badge-chip appearance="warning">Awaiting payment</gup-badge-chip>
            </gup-table-cell>
          </gup-table-row>
        `
      )}
    </gup-radio-button-group>
  `,
};

export const WithExternalCustomClasses: Story = {
  render: (args) => html`
    <span class="element-in-table">This has a custom class <code>.element-in-table</code> applied</span>
    ${template(
      args,
      html`
        <gup-table-cell type="header">Header 1 - <span class="element-in-table">Same class is applied here, and it should work</span></gup-table-cell>
        <gup-table-cell type="header">Header 2</gup-table-cell>
        <gup-table-cell type="header">Header 3</gup-table-cell>
        <gup-table-row>
          <gup-table-cell><span class="element-in-table">Same class is applied here, and it should work</span></gup-table-cell>
          <gup-table-cell>Data 2 because do model represent actually driving observe troops bit furniture failed sure desk rise greatest review mirror finest mathematics locate dried native drawn believed</gup-table-cell>
          <gup-table-cell>Data 3</gup-table-cell>
        </gup-table-row>
        <gup-table-row>
          <gup-table-cell>Data 4</gup-table-cell>
          <gup-table-cell>Data 5 show fifty visitor shaking recall help reason evening nature hit on information couple free write active member spend beat if touch probably opinion typical with some sünnipäevanädalalõpupeopärastlõunaväsimatus</gup-table-cell>
          <gup-table-cell>Data 6</gup-table-cell>
        </gup-table-row>
      `
    )}
    <style>
      .element-in-table {
        color: darkred;
      }
    </style>
  `,
};

export const WithDataLoadedAsynchronously: Story = {
  ...Default,
  render: (args) => html`
    <!-- <storybook-comment>When constructing a <code>gup-table</code> programmatically, use <code>updateSlots()</code> method to reinitialize the table slots after modifying its structure.</storybook-comment> -->
    ${template(
      args,
      html`
        <gup-table-cell type="header">Cat fact</gup-table-cell>
        <gup-table-cell type="header">ID</gup-table-cell>
      `
    )}
    <script>
      async function fetchCatFacts() {
        const response = await fetch('https://meowfacts.herokuapp.com/?count=6');
        const catFacts = await response.json();
        const storyRoot = document.getElementById('${args['data-story-id']}');
        catFacts.data.forEach((fact, index) => {
          const row = document.createElement('gup-table-row');
          const cellFact = document.createElement('gup-table-cell');
          cellFact.textContent = fact;
          row.appendChild(cellFact);
          const cellId = document.createElement('gup-table-cell');
          cellId.textContent = index + 1;
          row.appendChild(cellId);
          storyRoot.querySelector('gup-table').appendChild(row);
          storyRoot.querySelector('gup-table').updateSlots();
        });
      }
      fetchCatFacts();
    </script>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithPaginatedData: Story = {
  ...Default,
  render: (args) => {
    return html`
    <gup-track direction="vertical" gap="6">
      ${template(
        args,
        html`
          <gup-table-cell type="header">Cat fact</gup-table-cell>
          <gup-table-cell type="header">ID</gup-table-cell>
        `
      )}
      <gup-track gap="6" horizontal-alignment="justify" vertical-alignment="center">
        <gup-pagination prev-label="Prev" next-label="Next"></gup-pagination>
        <gup-dropdown-field name="items-per-page" placeholder="Items per page" label-hidden value="5" id="items-per-page" style="max-width: 140px;">
          <span slot="label">Items per page:</span>
          <gup-dropdown-menu>
            <gup-dropdown-menu-item label="5" value="5"></gup-dropdown-menu-item>
            <gup-dropdown-menu-item label="10" value="10"></gup-dropdown-menu-item>
          </gup-dropdown-menu>
        </gup-dropdown-field>
      </gup-track>
    </gup-track>
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        let itemsPerPage = 5;
        let cache = {};
        const totalPages = 10;
        // see https://github.com/wh-iterabb-it/meowfacts/blob/main/src/models/localizations/eng-us.js
        const totalItems = 91;

        const fetchData = async (pageNumber) => {
          const url = 'https://meowfacts.herokuapp.com?count=' + itemsPerPage;
          const response = await fetch(url);
          const result = await response.json();
          return result.data;
        };

        const loadPageData = async (pageNumber) => {
          if (cache[pageNumber]) {
            return cache[pageNumber];
          } else {
            const data = await fetchData(pageNumber);
            cache[pageNumber] = data;
            return data;
          }
        };

        const renderTableRows = (data) => {
          storyRoot.querySelectorAll('gup-table-row').forEach((row) => row.remove());
          data.forEach((item) => {
            const row = document.createElement('gup-table-row');
            row.innerHTML = '<gup-table-cell>' + item + '</gup-table-cell><gup-table-cell>' + item.length + '</gup-table-cell>';
            storyRoot.querySelector('gup-table').appendChild(row);
          });
          storyRoot.querySelector('gup-table').updateSlots();
        };

        const handlePageChange = async (event) => {
          const pageNumber = event.detail;
          const data = await loadPageData(pageNumber);
          renderTableRows(data);
        };

        loadPageData(1).then((data) => renderTableRows(data));

        const itemsPerPageDropdown = document.getElementById('items-per-page');
        itemsPerPageDropdown.value = itemsPerPage.toString();
        itemsPerPageDropdown.addEventListener('gup-value-change', async (event) => {
          perPage = event.detail;
          if (Array.isArray(perPage) && perPage[0] && perPage[0].hasOwnProperty('value') && perPage[0].value !== itemsPerPage.toString()) {
            itemsPerPage = parseInt(perPage[0].value);
            cache = {};
            const data = await loadPageData(1);
            renderTableRows(data);
            pagination.setAttribute('total-pages', Math.ceil(totalItems / itemsPerPage));
            pagination.setAttribute('current-page', 1);
          }
        });

        const pagination = document.getElementById('${args['data-story-id']}').parentElement.querySelector('gup-pagination');
        if (pagination) {
          pagination.setAttribute('total-pages', Math.ceil(totalItems / itemsPerPage));
          pagination.addEventListener('gup-page-change', handlePageChange);
        }
      })();
    </script>
  `;
  },
  parameters: {
    layout: 'padded',
    chromatic: { disableSnapshot: true },
  },
};
