import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Toast } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Toast> = createComponent({
  tagName: 'gup-toast',
  elementClass: Toast as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onRemove: 'gup-remove'
  },
  displayName: 'Toast'
})

export default reactWrapper;
