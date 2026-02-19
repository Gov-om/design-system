import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { DropdownMenuItem } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<DropdownMenuItem> = createComponent({
  tagName: 'gup-dropdown-menu-item',
  elementClass: DropdownMenuItem as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'DropdownMenuItem'
})

export default reactWrapper;
