import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { DropdownField } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<DropdownField> = createComponent({
  tagName: 'gup-dropdown-field',
  elementClass: DropdownField as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onValueChange: 'gup-value-change',
onInvalid: 'gup-invalid'
  },
  displayName: 'DropdownField'
})

export default reactWrapper;
