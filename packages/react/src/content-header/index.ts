import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { ContentHeader } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<ContentHeader> = createComponent({
  tagName: 'gup-content-header',
  elementClass: ContentHeader as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'ContentHeader'
})

export default reactWrapper;
