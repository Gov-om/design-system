import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Flag } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Flag> = createComponent({
  tagName: 'gup-flag',
  elementClass: Flag as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Flag'
})

export default reactWrapper;
