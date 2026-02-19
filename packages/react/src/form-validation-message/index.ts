import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FormValidationMessage } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FormValidationMessage> = createComponent({
  tagName: 'gup-form-validation-message',
  elementClass: FormValidationMessage as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'FormValidationMessage'
})

export default reactWrapper;
