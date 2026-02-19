import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { TableCell } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<TableCell> = createComponent({
  tagName: 'gup-table-cell',
  elementClass: TableCell as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'TableCell'
})

export default reactWrapper;
