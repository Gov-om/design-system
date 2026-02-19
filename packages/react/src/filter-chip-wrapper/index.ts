import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FilterChipWrapper } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FilterChipWrapper> = createComponent({
  tagName: 'gup-filter-chip-wrapper',
  elementClass: FilterChipWrapper as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onClick: 'gup-click'
  },
  displayName: 'FilterChipWrapper'
})

export default reactWrapper;
