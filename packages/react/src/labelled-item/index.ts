import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { LabelledItem } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<LabelledItem> = createComponent({
  tagName: 'gup-labelled-item',
  elementClass: LabelledItem as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'LabelledItem'
})

export default reactWrapper;
