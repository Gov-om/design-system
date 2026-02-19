import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FilterChip } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FilterChip> = createComponent({
  tagName: 'gup-filter-chip',
  elementClass: FilterChip as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onClick: 'gup-click'
  },
  displayName: 'FilterChip'
})

export default reactWrapper;
