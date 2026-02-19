import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { Search } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<Search> = createComponent({
  tagName: 'gup-search',
  elementClass: Search as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onClick: 'gup-click',
onClear: 'gup-clear',
onSubmit: 'gup-submit'
  },
  displayName: 'Search'
})

export default reactWrapper;
