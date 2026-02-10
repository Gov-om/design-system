import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Breadcrumbs } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Breadcrumbs> = createComponent({
  tagName: 'gup-breadcrumbs',
  elementClass: Breadcrumbs as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Breadcrumbs'
})

export default reactWrapper;
