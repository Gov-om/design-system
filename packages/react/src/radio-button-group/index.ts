import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { RadioButtonGroup } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<RadioButtonGroup> = createComponent({
  tagName: 'gup-radio-button-group',
  elementClass: RadioButtonGroup as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onInvalid: 'gup-invalid'
  },
  displayName: 'RadioButtonGroup'
})

export default reactWrapper;
