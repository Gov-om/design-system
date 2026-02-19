import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Details } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Details> = createComponent({
  tagName: 'gup-details',
  elementClass: Details as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onToggle: 'gup-toggle'
  },
  displayName: 'Details'
})

export default reactWrapper;
