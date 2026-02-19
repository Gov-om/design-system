import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Badge } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Badge> = createComponent({
  tagName: 'gup-badge',
  elementClass: Badge as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Badge'
})

export default reactWrapper;
