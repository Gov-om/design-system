import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Stepper } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Stepper> = createComponent({
  tagName: 'gup-stepper',
  elementClass: Stepper as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Stepper'
})

export default reactWrapper;
