import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Link } from '@gup-ds/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Link> = createComponent({
  tagName: 'gup-link',
  elementClass: Link as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onClick: 'gup-click'
  },
  displayName: 'Link'
})

export default reactWrapper;
