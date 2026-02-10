import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Spinner } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Spinner> = createComponent({
  tagName: 'gup-spinner',
  elementClass: Spinner as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Spinner'
})

export default reactWrapper;
