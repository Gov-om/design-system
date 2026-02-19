import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Banner } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Banner> = createComponent({
  tagName: 'gup-banner',
  elementClass: Banner as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onClose: 'gup-close'
  },
  displayName: 'Banner'
})

export default reactWrapper;
