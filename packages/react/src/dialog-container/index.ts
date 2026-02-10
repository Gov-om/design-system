import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { DialogContainer } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<DialogContainer> = createComponent({
  tagName: 'gup-dialog-container',
  elementClass: DialogContainer as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'DialogContainer'
})

export default reactWrapper;
