import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Image } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Image> = createComponent({
  tagName: 'gup-image',
  elementClass: Image as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'Image'
})

export default reactWrapper;
