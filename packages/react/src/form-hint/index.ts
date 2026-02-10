import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FormHint } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FormHint> = createComponent({
  tagName: 'gup-form-hint',
  elementClass: FormHint as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'FormHint'
})

export default reactWrapper;
