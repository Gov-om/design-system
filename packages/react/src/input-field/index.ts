import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { InputField } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<InputField> = createComponent({
  tagName: 'gup-input-field',
  elementClass: InputField as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onKeydown: 'gup-keydown',
onInput: 'gup-input',
onInvalid: 'gup-invalid',
onFocus: 'gup-focus'
  },
  displayName: 'InputField'
})

export default reactWrapper;
