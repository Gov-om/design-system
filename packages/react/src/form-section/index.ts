import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FormSection } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FormSection> = createComponent({
  tagName: 'gup-form-section',
  elementClass: FormSection as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'FormSection'
})

export default reactWrapper;
