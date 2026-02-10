import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { WizardFooter } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<WizardFooter> = createComponent({
  tagName: 'gup-wizard-footer',
  elementClass: WizardFooter as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'WizardFooter'
})

export default reactWrapper;
