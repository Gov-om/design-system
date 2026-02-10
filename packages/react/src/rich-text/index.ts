import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { RichText } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<RichText> = createComponent({
  tagName: 'gup-rich-text',
  elementClass: RichText as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'RichText'
})

export default reactWrapper;
