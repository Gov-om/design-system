import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Dialog } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Dialog> = createComponent({
  tagName: 'gup-dialog',
  elementClass: Dialog as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onClose: 'gup-close'
  },
  displayName: 'Dialog'
})

export default reactWrapper;
