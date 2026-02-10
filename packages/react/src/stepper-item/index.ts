import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { StepperItem } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<StepperItem> = createComponent({
  tagName: 'gup-stepper-item',
  elementClass: StepperItem as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'StepperItem'
})

export default reactWrapper;
