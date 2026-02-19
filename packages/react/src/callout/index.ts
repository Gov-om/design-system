import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Callout } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Callout> = createComponent({
  tagName: 'gup-callout',
  elementClass: Callout as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Callout'
})

export default reactWrapper;
