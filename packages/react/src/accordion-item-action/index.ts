import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { AccordionItemAction } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<AccordionItemAction> = createComponent({
  tagName: 'gup-accordion-item-action',
  elementClass: AccordionItemAction as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'AccordionItemAction'
})

export default reactWrapper;
