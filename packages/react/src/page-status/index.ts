import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { PageStatus } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<PageStatus> = createComponent({
  tagName: 'gup-page-status',
  elementClass: PageStatus as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'PageStatus'
})

export default reactWrapper;
