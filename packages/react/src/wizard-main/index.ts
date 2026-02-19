import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { WizardMain } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<WizardMain> = createComponent({
  tagName: 'gup-wizard-main',
  elementClass: WizardMain as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'WizardMain'
})

export default reactWrapper;
