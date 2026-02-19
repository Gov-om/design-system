import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Tooltip } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Tooltip> = createComponent({
  tagName: 'gup-tooltip',
  elementClass: Tooltip as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onTooltipShow: 'gup-tooltip-show',
onTooltipHide: 'gup-tooltip-hide'
  },
  displayName: 'Tooltip'
})

export default reactWrapper;
