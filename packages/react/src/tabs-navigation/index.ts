import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { TabsNavigation } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<TabsNavigation> = createComponent({
  tagName: 'gup-tabs-navigation',
  elementClass: TabsNavigation as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'TabsNavigation'
})

export default reactWrapper;
