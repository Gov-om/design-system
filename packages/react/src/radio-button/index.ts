import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { RadioButton } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<RadioButton> = createComponent({
  tagName: 'gup-radio-button',
  elementClass: RadioButton as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onFocus: 'gup-focus',
onBlur: 'gup-blur'
  },
  displayName: 'RadioButton'
})

export default reactWrapper;
