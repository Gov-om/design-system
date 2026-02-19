import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Pagination } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Pagination> = createComponent({
  tagName: 'gup-pagination',
  elementClass: Pagination as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onPageChange: 'gup-page-change'
  },
  displayName: 'Pagination'
})

export default reactWrapper;
