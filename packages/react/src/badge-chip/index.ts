import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { BadgeChip } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<BadgeChip> = createComponent({
  tagName: 'gup-badge-chip',
  elementClass: BadgeChip as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'BadgeChip'
})

export default reactWrapper;
