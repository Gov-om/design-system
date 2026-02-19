import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Table } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Table> = createComponent({
  tagName: 'gup-table',
  elementClass: Table as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Table'
})

export default reactWrapper;
