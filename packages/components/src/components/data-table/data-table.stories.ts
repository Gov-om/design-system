import { html, TemplateResult } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

// import { applyBreakpoint } from '../../../.storybook/utils';

import './data-table';
import './data-table.stories.css';
import '../table/table/table';
import '../table/table-row/table-row';
import '../table/table-cell/table-cell';
import '../badge-chip/badge-chip';
import '../pagination/pagination';
import '../link/link';
import '../button/button';
import '../button-group/button-group';
import '../icon/icon';
import '../input-field/input-field';
import '../dropdown/dropdown-field/dropdown-field';
import '../dropdown/dropdown-menu/dropdown-menu';
import '../dropdown/dropdown-menu-item/dropdown-menu-item';
import '../checkbox/checkbox';
import '../radio-button/radio-button';
import '../radio-button-group/radio-button-group';
import { type DataTable } from './data-table';

const { args, argTypes, events } = getWcStorybookHelpers('gup-data-table');
type Story = StoryObj<DataTable & typeof args>;

// Helper function to generate source code string for documentation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateSource = (storyArgs: any, slotHtml: string) => {
  const attrs: string[] = [];

  if (storyArgs.title) attrs.push(`title="${storyArgs.title}"`);
  if (storyArgs.description) attrs.push(`description="${storyArgs.description}"`);
  if (storyArgs['search-placeholder']) attrs.push(`search-placeholder="${storyArgs['search-placeholder']}"`);
  if (storyArgs['total-items'] !== undefined) attrs.push(`.totalItems="\${${storyArgs['total-items']}}"`);
  if (storyArgs['current-page'] !== undefined) attrs.push(`.currentPage="\${${storyArgs['current-page']}}"`);
  if (storyArgs['items-per-page'] !== undefined) attrs.push(`.itemsPerPage="\${${storyArgs['items-per-page']}}"`);
  if (storyArgs.layout) attrs.push(`layout="${storyArgs.layout}"`);
  if (storyArgs['show-search']) attrs.push(`show-search`);
  if (storyArgs['show-filters']) attrs.push(`show-filters`);
  if (storyArgs['show-view-button']) attrs.push(`show-view-button`);
  if (storyArgs['view-button-text']) attrs.push(`view-button-text="${storyArgs['view-button-text']}"`);
  if (storyArgs['view-button-icon']) attrs.push(`view-button-icon="${storyArgs['view-button-icon']}"`);
  if (storyArgs['filter-panel-open']) attrs.push(`filter-panel-open`);
  if (storyArgs['filters-button-text']) attrs.push(`filters-button-text="${storyArgs['filters-button-text']}"`);
  if (storyArgs['empty-title']) attrs.push(`empty-title="${storyArgs['empty-title']}"`);
  if (storyArgs['empty-description']) attrs.push(`empty-description="${storyArgs['empty-description']}"`);
  if (storyArgs.columns?.length) attrs.push(`.columns="\${columns}"`);
  if (storyArgs.filters?.length) attrs.push(`.filters="\${filters}"`);
  if (storyArgs['applied-filters']?.length) attrs.push(`.appliedFilters="\${appliedFilters}"`);
  if (storyArgs['mobile-action-buttons']?.length) attrs.push(`.mobileActionButtons="\${mobileActionButtons}"`);

  const attrString = attrs.length ? `\n  ${attrs.join('\n  ')}\n` : '';
  return `<gup-data-table${attrString}>${slotHtml ? `\n${slotHtml}\n` : ''}</gup-data-table>`;
};

// Helper function to render data-table with proper property bindings
// The template helper from wc-storybook-helpers doesn't handle complex property bindings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderDataTable = (renderArgs: any, slotContent: TemplateResult) => html`
  <gup-data-table
    title=${renderArgs.title || ''}
    description=${renderArgs.description || ''}
    search-placeholder=${renderArgs['search-placeholder'] || 'Find data'}
    .totalItems=${renderArgs['total-items'] ?? 0}
    .currentPage=${renderArgs['current-page'] ?? 1}
    .itemsPerPage=${renderArgs['items-per-page'] ?? 10}
    layout=${renderArgs.layout || 'table'}
    ?show-search=${renderArgs['show-search'] ?? false}
    ?show-filters=${renderArgs['show-filters'] ?? false}
    ?show-view-button=${renderArgs['show-view-button'] ?? true}
    ?filter-panel-open=${renderArgs['filter-panel-open'] ?? false}
    view-button-text=${renderArgs['view-button-text'] || 'View application'}
    view-button-icon=${renderArgs['view-button-icon'] || ''}
    filters-button-text=${renderArgs['filters-button-text'] || 'Filters'}
    empty-title=${renderArgs['empty-title'] || ''}
    empty-description=${renderArgs['empty-description'] || ''}
    .columns=${renderArgs.columns ?? []}
    .filters=${renderArgs.filters ?? []}
    .appliedFilters=${renderArgs['applied-filters'] ?? []}
    .mobileActionButtons=${renderArgs['mobile-action-buttons'] ?? []}
  >
    ${slotContent}
  </gup-data-table>
`;

export default {
  title: 'Components/Data table/Data table',
  component: 'gup-data-table',
  args,
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
  },
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: events,
    },
  },
} as Meta;

// Slot HTML strings for source code generation
const applicationStatusRowsHtml = `  <gup-table-cell type="header" style="width: 180px">Number</gup-table-cell>
  <gup-table-cell type="header">Type</gup-table-cell>
  <gup-table-cell type="header" style="width: 110px">Start date</gup-table-cell>
  <gup-table-cell type="header" style="width: 110px">End date</gup-table-cell>
  <gup-table-cell type="header" style="width: 150px">Status</gup-table-cell>
  <gup-table-row>
    <gup-table-cell>RN07A-1234567</gup-table-cell>
    <gup-table-cell>Registration of Ownership to Heirs</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="positive">Confirmed</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <!-- ... more rows ... -->`;

const bulkActionRowsHtml = `  <gup-table-cell type="header" style="width: 160px">
    <gup-checkbox size="s" id="select-all-checkbox">Licences id</gup-checkbox>
  </gup-table-cell>
  <gup-table-cell type="header">Licences Name</gup-table-cell>
  <gup-table-cell type="header">First Issue Date</gup-table-cell>
  <gup-table-cell type="header">Governate</gup-table-cell>
  <gup-table-cell type="header">Wilayat</gup-table-cell>
  <gup-table-cell type="header">Village</gup-table-cell>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-checkbox" checked>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
  </gup-table-row>
  <!-- ... more rows ... -->`;

const rowActionRowsHtml = `  <gup-table-cell type="header" style="width: 160px">
    <gup-checkbox size="s" id="select-all-row-action">Licences id</gup-checkbox>
  </gup-table-cell>
  <gup-table-cell type="header">Licences Name</gup-table-cell>
  <gup-table-cell type="header">First Issue Date</gup-table-cell>
  <gup-table-cell type="header">Governate</gup-table-cell>
  <gup-table-cell type="header">Wilayat</gup-table-cell>
  <gup-table-cell type="header">Village</gup-table-cell>
  <gup-table-cell type="header" style="width: 140px"><span class="visually-hidden">Actions</span></gup-table-cell>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-action-checkbox">00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
    <gup-table-cell style="width: 140px">
      <gup-link href="#">Renew</gup-link>
      <gup-link href="#" style="margin-left: 24px">Edit</gup-link>
    </gup-table-cell>
  </gup-table-row>
  <!-- ... more rows ... -->`;

// const mobileCardRowsHtml = `  <div class="mobile-card">
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Application</span>
//       <span class="mobile-card-value">AE1234567</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Type</span>
//       <span class="mobile-card-value">Application</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Status</span>
//       <span class="mobile-card-value">
//         <gup-badge-chip appearance="positive">Accepted</gup-badge-chip>
//       </span>
//     </div>
//     <div class="mobile-card-row mobile-card-row--last">
//       <span class="mobile-card-label">Action</span>
//       <span class="mobile-card-value">
//         <gup-link href="#">Link</gup-link>
//       </span>
//     </div>
//   </div>
//   <!-- ... more cards ... -->`;

// Pre-defined story args for use in both story definitions and source generation
const defaultArgs = {
  title: 'Applications',
  description: 'This is a short description',
  'search-placeholder': 'Find data',
  'total-items': 17,
  'current-page': 1,
  'items-per-page': 6,
  layout: 'table' as const,
  'show-search': true,
  'show-filters': true,
  'show-view-button': true,
  'view-button-text': 'View Application',
  columns: [
    { key: 'number', label: 'Number', width: '180px' },
    { key: 'type', label: 'Type' },
    { key: 'startDate', label: 'Start date', width: '110px' },
    { key: 'endDate', label: 'End date', width: '110px' },
    { key: 'status', label: 'Status', width: '150px' },
  ],
  filters: [
    { key: 'dateBefore', label: 'Date before', type: 'date' as const },
    { key: 'dateAfter', label: 'Date after', type: 'date' as const },
  ],
};

const dropdownOpenedArgs = {
  ...defaultArgs,
  'filter-panel-open': true,
  'applied-filters': [
    { key: 'dateBefore', value: '2025-01-15', label: 'Date before' },
    { key: 'dateAfter', value: '2024-12-01', label: 'Date after' },
  ],
};

const bulkActionArgs = {
  title: 'Licenses Listing',
  description: 'This is a short description',
  'search-placeholder': 'Find data',
  'total-items': 5,
  'current-page': 1,
  'items-per-page': 5,
  layout: 'table' as const,
  'show-search': true,
  'show-filters': true,
  'show-view-button': true,
  'view-button-text': 'Download License',
  'view-button-icon': 'download',
  columns: [
    { key: 'licencesId', label: 'Licences id', width: '160px' },
    { key: 'licencesName', label: 'Licences Name' },
    { key: 'firstIssueDate', label: 'First Issue Date' },
    { key: 'governate', label: 'Governate' },
    { key: 'wilayat', label: 'Wilayat' },
    { key: 'village', label: 'Village' },
  ],
  filters: [
    { key: 'dateBefore', label: 'Date before', type: 'date' as const },
    { key: 'dateAfter', label: 'Date after', type: 'date' as const },
  ],
};

const rowActionArgs = {
  ...bulkActionArgs,
  columns: [
    { key: 'licencesId', label: 'Licences id', width: '160px' },
    { key: 'licencesName', label: 'Licences Name' },
    { key: 'firstIssueDate', label: 'First Issue Date' },
    { key: 'governate', label: 'Governate' },
    { key: 'wilayat', label: 'Wilayat' },
    { key: 'village', label: 'Village' },
    { key: 'actions', label: '', width: '140px' },
  ],
};

// const mobileArgs = {
//   title: '',
//   description: '',
//   'search-placeholder': 'Find data',
//   'total-items': 3,
//   'current-page': 1,
//   'items-per-page': 3,
//   layout: 'stacked' as const,
//   'show-search': true,
//   'show-filters': true,
//   'mobile-action-buttons': ['Action', 'Action'],
//   'filters-button-text': 'Filters',
//   columns: [
//     { key: 'application', label: 'Application' },
//     { key: 'type', label: 'Type' },
//     { key: 'status', label: 'Status' },
//     { key: 'action', label: 'Action' },
//   ],
//   filters: [
//     { key: 'dateBefore', label: 'Date before', type: 'date' as const },
//     { key: 'dateAfter', label: 'Date after', type: 'date' as const },
//   ],
//   'applied-filters': [
//     { key: 'dateBefore', value: '2025-01-15', label: 'Date before' },
//     { key: 'dateAfter', value: '2024-12-01', label: 'Date after' },
//   ],
// };

// const mobileDropdownOpenedArgs = {
//   ...mobileArgs,
//   'filter-panel-open': true,
//   filters: [
//     { key: 'contentType', label: 'Content type', type: 'select' as const },
//     { key: 'category', label: 'Category', type: 'select' as const },
//     { key: 'entity', label: 'Entity', type: 'select' as const },
//     { key: 'updatedAfter', label: 'Updated after', type: 'date' as const },
//     { key: 'updatedBefore', label: 'Updated before', type: 'date' as const },
//   ],
//   'applied-filters': [
//     { key: 'contentType', value: '2 selected', label: 'Content type: 2 selected' },
//     { key: 'category', value: '', label: 'Category' },
//   ],
// };

const emptyTableArgs = {
  title: 'Applications',
  description: 'This is a short description',
  'search-placeholder': 'Find data',
  'total-items': 0,
  'current-page': 1,
  'items-per-page': 6,
  layout: 'table' as const,
  'show-search': true,
  'show-filters': true,
  'show-view-button': true,
  'view-button-text': 'Action',
  columns: [
    { key: 'number', label: 'Number', width: '180px' },
    { key: 'type', label: 'Type' },
    { key: 'startDate', label: 'Start date', width: '110px' },
    { key: 'endDate', label: 'End date', width: '110px' },
    { key: 'status', label: 'Status', width: '150px' },
  ],
  filters: [{ key: 'filter', label: 'Filter', type: 'select' as const }],
  'empty-title': 'No applications found',
  'empty-description': 'There are no applications to display. Create your first application to get started.',
};

// Application Status table rows with various status badges - matching Figma design
const applicationStatusRows: TemplateResult = html`
  <gup-table-cell type="header" style="width: 180px">Number</gup-table-cell>
  <gup-table-cell type="header">Type</gup-table-cell>
  <gup-table-cell type="header" style="width: 110px">Start date</gup-table-cell>
  <gup-table-cell type="header" style="width: 110px">End date</gup-table-cell>
  <gup-table-cell type="header" style="width: 150px">Status</gup-table-cell>
  <gup-table-row>
    <gup-table-cell>RN07A-1234567</gup-table-cell>
    <gup-table-cell>Registration of Ownership to Heirs</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="positive">Confirmed</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-1234567</gup-table-cell>
    <gup-table-cell>Registration of a sale contract via Brokers</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="brand">Processing</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-1234567</gup-table-cell>
    <gup-table-cell>Register of usufruct contract</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="brand">Submitted</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>TEMPRRN07A-1234567</gup-table-cell>
    <gup-table-cell>Transferring of a real estate mortgage - One Entity to Another</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="neutral">Draft</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-1234567</gup-table-cell>
    <gup-table-cell>Transferring of a real estate mortgage - One Entity to Another</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="negative" is-filled>Rejected</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-1234567</gup-table-cell>
    <gup-table-cell>Registration of Ownership to Heirs</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="positive">Confirmed</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-2345678</gup-table-cell>
    <gup-table-cell>Transfer of Property Rights</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="brand">Processing</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-3456789</gup-table-cell>
    <gup-table-cell>Registration of a Gift Contract</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="positive">Confirmed</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-4567890</gup-table-cell>
    <gup-table-cell>Land Division Application</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="neutral">Draft</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-5678901</gup-table-cell>
    <gup-table-cell>Registration of Lease Agreement</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="brand">Submitted</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-6789012</gup-table-cell>
    <gup-table-cell>Property Valuation Request</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="positive">Confirmed</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-7890123</gup-table-cell>
    <gup-table-cell>Mortgage Release Application</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="negative" is-filled>Rejected</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-8901234</gup-table-cell>
    <gup-table-cell>Property Boundary Correction</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="brand">Processing</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-9012345</gup-table-cell>
    <gup-table-cell>Registration of Easement Rights</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="neutral">Draft</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-0123456</gup-table-cell>
    <gup-table-cell>Title Deed Replacement</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="positive">Confirmed</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell>RN07A-1122334</gup-table-cell>
    <gup-table-cell>Joint Ownership Registration</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>0000-00-00</gup-table-cell>
    <gup-table-cell>
      <gup-badge-chip appearance="brand">Submitted</gup-badge-chip>
    </gup-table-cell>
  </gup-table-row>
`;

// Mobile card rows for stacked layout
// Each card is a div with rows containing label-value pairs
// const mobileCardRows: TemplateResult = html`
//   <div class="mobile-card">
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Application</span>
//       <span class="mobile-card-value">AE1234567</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Type</span>
//       <span class="mobile-card-value">Application</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Status</span>
//       <span class="mobile-card-value">
//         <gup-badge-chip appearance="positive">Accepted</gup-badge-chip>
//       </span>
//     </div>
//     <div class="mobile-card-row mobile-card-row--last">
//       <span class="mobile-card-label">Action</span>
//       <span class="mobile-card-value">
//         <gup-link href="#">Link</gup-link>
//       </span>
//     </div>
//   </div>
//   <div class="mobile-card">
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Application</span>
//       <span class="mobile-card-value">AE1234567</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Type</span>
//       <span class="mobile-card-value">Application</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Status</span>
//       <span class="mobile-card-value">
//         <gup-badge-chip appearance="warning">Pending</gup-badge-chip>
//       </span>
//     </div>
//     <div class="mobile-card-row mobile-card-row--last">
//       <span class="mobile-card-label">Action</span>
//       <span class="mobile-card-value">
//         <gup-link href="#">Link</gup-link>
//       </span>
//     </div>
//   </div>
//   <div class="mobile-card">
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Application</span>
//       <span class="mobile-card-value">AE1234567</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Type</span>
//       <span class="mobile-card-value">Application</span>
//     </div>
//     <div class="mobile-card-row">
//       <span class="mobile-card-label">Status</span>
//       <span class="mobile-card-value">
//         <gup-badge-chip appearance="neutral">Waiting</gup-badge-chip>
//       </span>
//     </div>
//     <div class="mobile-card-row mobile-card-row--last">
//       <span class="mobile-card-label">Action</span>
//       <span class="mobile-card-value">
//         <gup-link href="#">Link</gup-link>
//       </span>
//     </div>
//   </div>
// `;

/**
 * Application Status table as shown in Figma designs (Default).
 * Features search input with icon, View Application and Filter buttons in a button group,
 * filter panel that shows/hides on click of Filter button, various status badges and pagination.
 * Shows 6 of 17 items with pagination (3 pages total).
 * Use the Controls panel to interact with the component properties.
 */
export const Default: Story = {
  render: (args) => renderDataTable(args, applicationStatusRows),
  args: defaultArgs,
  parameters: {
    docs: {
      source: {
        transform: () => generateSource(defaultArgs, applicationStatusRowsHtml),
        language: 'html',
        type: 'code',
      },
    },
  },
};

/**
 * Application Status table with filter dropdown opened (Desktop).
 * Shows the data table with the filter panel visible containing Date before and Date after fields.
 * The Filter button is in active/pressed state with "Apply (2)" showing selected filter count.
 * Use the Controls panel to interact with the component properties.
 */
export const DropdownOpened: Story = {
  render: (args) => renderDataTable(args, applicationStatusRows),
  args: dropdownOpenedArgs,
  parameters: {
    docs: {
      source: {
        transform: () => generateSource(dropdownOpenedArgs, applicationStatusRowsHtml),
        language: 'html',
        type: 'code',
      },
    },
  },
};

// Helper function to query elements through shadow DOM
const queryShadowAll = <T extends Element>(selector: string): T[] => {
  const results: T[] = [];

  // First check document
  results.push(...Array.from(document.querySelectorAll<T>(selector)));

  // Then check all shadow roots
  const walkShadowRoots = (root: Document | ShadowRoot) => {
    const elements = root.querySelectorAll('*');
    elements.forEach((el) => {
      if (el.shadowRoot) {
        results.push(...Array.from(el.shadowRoot.querySelectorAll<T>(selector)));
        walkShadowRoots(el.shadowRoot);
      }
    });
  };

  walkShadowRoots(document);
  return results;
};

const queryShadow = <T extends Element>(selector: string): T | null => {
  const results = queryShadowAll<T>(selector);
  return results.length > 0 ? results[0] : null;
};

// Helper function to update header checkbox based on row checkbox states
const updateHeaderCheckbox = (headerSelector: string, rowSelector: string) => {
  const header = queryShadow<HTMLElement & { checked: boolean; indeterminate: boolean }>(headerSelector);
  const checkboxes = queryShadowAll<HTMLElement & { checked: boolean }>(rowSelector);
  if (!header || checkboxes.length === 0) return;

  const checkedCount = checkboxes.filter((cb) => cb.checked).length;
  const allChecked = checkedCount === checkboxes.length;
  const noneChecked = checkedCount === 0;

  header.indeterminate = !allChecked && !noneChecked;
  header.checked = allChecked;
};

// Helper function to handle header checkbox click - toggles all row checkboxes
const handleHeaderCheckboxChange = (headerSelector: string, rowSelector: string, isChecked: boolean) => {
  const header = queryShadow<HTMLElement & { checked: boolean; indeterminate: boolean }>(headerSelector);
  const checkboxes = queryShadowAll<HTMLElement & { checked: boolean }>(rowSelector);

  // Clear indeterminate state
  if (header) {
    header.indeterminate = false;
  }

  // Set all row checkboxes to match header state
  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
};

// Bulk action table rows with checkboxes for row selection - matching Figma 87:9345
// All rows have checkboxes with Licence ID as label, header has select-all checkbox
const bulkActionRows: TemplateResult = html`
  <gup-table-cell type="header" style="width: 160px">
    <gup-checkbox
      size="s"
      id="select-all-checkbox"
      checked
      @gup-change=${(e: CustomEvent) => {
        handleHeaderCheckboxChange('#select-all-checkbox', '.row-checkbox', e.detail);
      }}
    >Licences id</gup-checkbox>
  </gup-table-cell>
  <gup-table-cell type="header">Licences Name</gup-table-cell>
  <gup-table-cell type="header">First Issue Date</gup-table-cell>
  <gup-table-cell type="header">Governate</gup-table-cell>
  <gup-table-cell type="header">Wilayat</gup-table-cell>
  <gup-table-cell type="header">Village</gup-table-cell>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-checkbox" checked @gup-change=${() => updateHeaderCheckbox('#select-all-checkbox', '.row-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-checkbox" checked @gup-change=${() => updateHeaderCheckbox('#select-all-checkbox', '.row-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-checkbox" checked @gup-change=${() => updateHeaderCheckbox('#select-all-checkbox', '.row-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-checkbox" checked @gup-change=${() => updateHeaderCheckbox('#select-all-checkbox', '.row-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
  </gup-table-row>
`;

// Row action table rows with action links (Renew, Edit) - matching Figma 87:10442
// Each row has checkboxes and action links at the end
const rowActionRows: TemplateResult = html`
  <gup-table-cell type="header" style="width: 160px">
    <gup-checkbox
      size="s"
      id="select-all-row-action"
      @gup-change=${(e: CustomEvent) => {
        handleHeaderCheckboxChange('#select-all-row-action', '.row-action-checkbox', e.detail);
      }}
    >Licences id</gup-checkbox>
  </gup-table-cell>
  <gup-table-cell type="header">Licences Name</gup-table-cell>
  <gup-table-cell type="header">First Issue Date</gup-table-cell>
  <gup-table-cell type="header">Governate</gup-table-cell>
  <gup-table-cell type="header">Wilayat</gup-table-cell>
  <gup-table-cell type="header">Village</gup-table-cell>
  <gup-table-cell type="header" style="width: 140px"><span class="visually-hidden">Actions</span></gup-table-cell>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-action-checkbox" @gup-change=${() => updateHeaderCheckbox('#select-all-row-action', '.row-action-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
    <gup-table-cell style="width: 140px">
      <gup-link href="#">Renew</gup-link>
      <gup-link href="#" style="margin-left: 24px">Edit</gup-link>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-action-checkbox" @gup-change=${() => updateHeaderCheckbox('#select-all-row-action', '.row-action-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
    <gup-table-cell style="width: 140px">
      <gup-link href="#">Renew</gup-link>
      <gup-link href="#" style="margin-left: 24px">Edit</gup-link>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-action-checkbox" @gup-change=${() => updateHeaderCheckbox('#select-all-row-action', '.row-action-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
    <gup-table-cell style="width: 140px">
      <gup-link href="#">Renew</gup-link>
      <gup-link href="#" style="margin-left: 24px">Edit</gup-link>
    </gup-table-cell>
  </gup-table-row>
  <gup-table-row>
    <gup-table-cell style="width: 160px">
      <gup-checkbox size="s" class="row-action-checkbox" @gup-change=${() => updateHeaderCheckbox('#select-all-row-action', '.row-action-checkbox')}>00000000</gup-checkbox>
    </gup-table-cell>
    <gup-table-cell>Name</gup-table-cell>
    <gup-table-cell>00/00/0000</gup-table-cell>
    <gup-table-cell>Governate</gup-table-cell>
    <gup-table-cell>Wilayat</gup-table-cell>
    <gup-table-cell>Village</gup-table-cell>
    <gup-table-cell style="width: 140px">
      <gup-link href="#">Renew</gup-link>
      <gup-link href="#" style="margin-left: 24px">Edit</gup-link>
    </gup-table-cell>
  </gup-table-row>
`;

/**
 * Bulk Action table with row selection checkboxes - matches Figma 87:9345.
 * Shows a "Licenses Listing" table with checkbox column in header for select-all
 * and checkbox in each row for individual selection (label shows Licence ID).
 * All rows appear selected. Includes "Download License" button with download icon
 * and "Filter" action buttons.
 * Use the Controls panel to interact with the component properties.
 */
export const BulkAction: Story = {
  render: (args) => renderDataTable(args, bulkActionRows),
  args: bulkActionArgs,
  parameters: {
    docs: {
      source: {
        transform: () => generateSource(bulkActionArgs, bulkActionRowsHtml),
        language: 'html',
        type: 'code',
      },
    },
  },
};

/**
 * Row Action table with action links per row - matches Figma 87:10442.
 * Shows a "Licenses Listing" table with checkbox column and action links
 * (Renew, Edit) in each row. Checkboxes are unchecked by default.
 * Includes "Download License" and "Filter" action buttons.
 * Use the Controls panel to interact with the component properties.
 */
export const RowAction: Story = {
  render: (args) => renderDataTable(args, rowActionRows),
  args: rowActionArgs,
  parameters: {
    docs: {
      source: {
        transform: () => generateSource(rowActionArgs, rowActionRowsHtml),
        language: 'html',
        type: 'code',
      },
    },
  },
};

/**
 * Application Status table - Mobile view.
 * Responsive stacked layout for mobile screens with vertical action buttons.
 * Shows search input, Action buttons, Filters button, and stacked card rows.
 * Use the Controls panel to interact with the component properties.
 */
// export const Mobile: Story = {
//   render: (args) => renderDataTable(args, mobileCardRows),
//   args: mobileArgs,
//   parameters: {
//     docs: {
//       source: {
//         transform: () => generateSource(mobileArgs, mobileCardRowsHtml),
//         language: 'html',
//         type: 'code',
//       },
//     },
//   },
//   ...applyBreakpoint('xsmall'),
// };

/**
 * Application Status table - Mobile view with filters expanded.
 * Shows the mobile layout with the filter panel open containing filter input fields.
 * The filter button shows active state with "Filters (2)" text and close icon.
 * Use the Controls panel to interact with the component properties.
 */
// export const MobileDropdownOpened: Story = {
//   render: (args) => renderDataTable(args, mobileCardRows),
//   args: mobileDropdownOpenedArgs,
//   parameters: {
//     docs: {
//       source: {
//         transform: () => generateSource(mobileDropdownOpenedArgs, mobileCardRowsHtml),
//         language: 'html',
//         type: 'code',
//       },
//     },
//   },
//   ...applyBreakpoint('xsmall'),
// };

// Skeleton content
// Pure skeleton blocks without any table components
const skeletonContent: TemplateResult = html`
  <!-- Skeleton header -->
  <div class="skeleton-header">
    <div class="skeleton-block skeleton-title"></div>
    <div class="skeleton-block skeleton-description"></div>
  </div>

  <!-- Skeleton controls -->
  <div class="skeleton-controls">
    <div class="skeleton-block skeleton-search"></div>
    <div class="skeleton-buttons">
      <div class="skeleton-block skeleton-button"></div>
      <div class="skeleton-block skeleton-button"></div>
      <div class="skeleton-block skeleton-button"></div>
    </div>
  </div>

  <!-- Skeleton table -->
  <div class="skeleton-table">
    <!-- Header row -->
    <div class="skeleton-table-row skeleton-table-row--header">
      <div class="skeleton-block skeleton-cell skeleton-cell--number"></div>
      <div class="skeleton-block skeleton-cell skeleton-cell--type"></div>
      <div class="skeleton-block skeleton-cell skeleton-cell--start-date"></div>
      <div class="skeleton-block skeleton-cell skeleton-cell--end-date"></div>
      <div class="skeleton-block skeleton-cell skeleton-cell--status"></div>
    </div>
    <!-- Data rows -->
    ${[1, 2, 3, 4, 5, 6].map(
      () => html`
        <div class="skeleton-table-row">
          <div class="skeleton-block skeleton-cell skeleton-cell--number-data"></div>
          <div class="skeleton-block skeleton-cell skeleton-cell--type-data"></div>
          <div class="skeleton-block skeleton-cell skeleton-cell--start-date"></div>
          <div class="skeleton-block skeleton-cell skeleton-cell--end-date"></div>
          <div class="skeleton-block skeleton-cell skeleton-cell--status-data"></div>
        </div>
      `
    )}
  </div>

  <!-- Skeleton pagination -->
  <div class="skeleton-pagination">
    <div class="skeleton-block skeleton-pagination-text"></div>
    <div class="skeleton-pagination-controls">
      <div class="skeleton-block skeleton-pagination-arrow"></div>
      <div class="skeleton-block skeleton-pagination-page"></div>
      <div class="skeleton-block skeleton-pagination-page"></div>
      <div class="skeleton-block skeleton-pagination-page"></div>
      <div class="skeleton-block skeleton-pagination-page"></div>
      <div class="skeleton-block skeleton-pagination-page"></div>
      <div class="skeleton-block skeleton-pagination-page"></div>
      <div class="skeleton-block skeleton-pagination-next"></div>
    </div>
  </div>
`;

/**
 * Skeleton loading state for the data table
 * Shows animated placeholder blocks while data is being loaded.
 * All elements are pure skeleton blocks (no actual table or text).
 */
export const Skeleton: Story = {
  render: () => html`
    <div class="application-status-container">
      <div class="application-status-content" style="display: flex; flex-direction: column; gap: 32px;">
        ${skeletonContent}
      </div>
    </div>
  `,
  args: {},
};

/**
 * Empty table state for desktop
 * Shows "No applications found" centered message when no data is available.
 * Includes search input, action buttons, and "0 of 0 items" in footer.
 * Use the Controls panel to interact with the component properties.
 */
export const EmptyTable: Story = {
  render: (args) => renderDataTable(args, html``),
  args: emptyTableArgs,
  parameters: {
    docs: {
      source: {
        transform: () => generateSource(emptyTableArgs, ''),
        language: 'html',
        type: 'code',
      },
    },
  },
};
