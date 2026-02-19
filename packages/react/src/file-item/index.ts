import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FileItem } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FileItem> = createComponent({
  tagName: 'gup-file-item',
  elementClass: FileItem as unknown as Constructor<LitElement>,
  react: React,
  events: {
    
  },
  displayName: 'FileItem'
})

export default reactWrapper;
