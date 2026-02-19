import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { ScreenreaderText } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<ScreenreaderText> = createComponent({
  tagName: 'gup-screenreader-text',
  elementClass: ScreenreaderText as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'ScreenreaderText'
})

export default reactWrapper;
