import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Tabs } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Tabs> = createComponent({
  tagName: 'gup-tabs',
  elementClass: Tabs as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Tabs'
})

export default reactWrapper;
