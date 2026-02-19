import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { TabPanel } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<TabPanel> = createComponent({
  tagName: 'gup-tab-panel',
  elementClass: TabPanel as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'TabPanel'
})

export default reactWrapper;
