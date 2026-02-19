import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Header } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Header> = createComponent({
  tagName: 'gup-header',
  elementClass: Header as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Header'
})

export default reactWrapper;
