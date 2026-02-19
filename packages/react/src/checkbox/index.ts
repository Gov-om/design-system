import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Checkbox } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Checkbox> = createComponent({
  tagName: 'gup-checkbox',
  elementClass: Checkbox as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onInvalid: 'gup-invalid'
  },
  displayName: 'Checkbox'
})

export default reactWrapper;
