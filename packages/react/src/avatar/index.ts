import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Avatar } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Avatar> = createComponent({
  tagName: 'gup-avatar',
  elementClass: Avatar as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Avatar'
})

export default reactWrapper;
