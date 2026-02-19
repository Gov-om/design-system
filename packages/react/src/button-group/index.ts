import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { ButtonGroup } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<ButtonGroup> = createComponent({
  tagName: 'gup-button-group',
  elementClass: ButtonGroup as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'ButtonGroup'
})

export default reactWrapper;
