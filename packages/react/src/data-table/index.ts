import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { DataTable } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';

const reactWrapper: ReactWebComponent<DataTable> = createComponent({
  tagName: 'gup-data-table',
  elementClass: DataTable as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onSearch: 'gup-search',
    onFilterChange: 'gup-filter-change',
    onPageChange: 'gup-page-change',
    onClearFilters: 'gup-clear-filters',
  },
  displayName: 'DataTable',
});

export default reactWrapper;
