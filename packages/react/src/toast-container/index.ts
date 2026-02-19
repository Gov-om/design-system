import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { ToastContainer } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<ToastContainer> = createComponent({
  tagName: 'gup-toast-container',
  elementClass: ToastContainer as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'ToastContainer'
})

export default reactWrapper;
