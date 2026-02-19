import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Logo } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Logo> = createComponent({
  tagName: 'gup-logo',
  elementClass: Logo as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Logo'
})

export default reactWrapper;
