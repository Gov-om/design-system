import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { GenericPopup } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<GenericPopup> = createComponent({
  tagName: 'gup-generic-popup',
  elementClass: GenericPopup as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onPopupShow: 'gup-popup-show',
onPopupHide: 'gup-popup-hide'
  },
  displayName: 'GenericPopup'
})

export default reactWrapper;
