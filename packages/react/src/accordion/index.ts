import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Accordion } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Accordion> = createComponent({
  tagName: 'gup-accordion',
  elementClass: Accordion as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Accordion'
})

export default reactWrapper;
