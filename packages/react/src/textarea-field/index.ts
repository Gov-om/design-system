import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { TextareaField } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<TextareaField> = createComponent({
  tagName: 'gup-textarea-field',
  elementClass: TextareaField as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onInput: 'gup-input',
onInvalid: 'gup-invalid'
  },
  displayName: 'TextareaField'
})

export default reactWrapper;
