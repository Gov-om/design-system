import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Divider } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Divider> = createComponent({
  tagName: 'gup-divider',
  elementClass: Divider as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Divider'
})

export default reactWrapper;
