import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Tab } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Tab> = createComponent({
  tagName: 'gup-tab',
  elementClass: Tab as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onTabClick: 'gup-tab-click'
  },
  displayName: 'Tab'
})

export default reactWrapper;
