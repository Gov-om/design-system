import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { DataSheet } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<DataSheet> = createComponent({
  tagName: 'gup-data-sheet',
  elementClass: DataSheet as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'DataSheet'
})

export default reactWrapper;
