import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Button } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Button> = createComponent({
  tagName: 'gup-button',
  elementClass: Button as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onClick: 'gup-click'
  },
  displayName: 'Button'
})

export default reactWrapper;
