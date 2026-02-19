import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { DropdownMenu } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<DropdownMenu> = createComponent({
  tagName: 'gup-dropdown-menu',
  elementClass: DropdownMenu as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onSearchInput: 'gup-search-input',
onApply: 'gup-apply'
  },
  displayName: 'DropdownMenu'
})

export default reactWrapper;
