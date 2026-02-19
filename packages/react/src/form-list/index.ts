import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FormList } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FormList> = createComponent({
  tagName: 'gup-form-list',
  elementClass: FormList as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'FormList'
})

export default reactWrapper;
