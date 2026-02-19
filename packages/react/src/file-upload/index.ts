import * as React from 'react';
import type { LitElement } from 'lit';
import { createComponent } from '@lit/react';
import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import { FileUpload } from '@govom/components';
import type { ReactWebComponent } from '../../utils/lit-react-type-utils';


const reactWrapper: ReactWebComponent<FileUpload> = createComponent({
  tagName: 'gup-file-upload',
  elementClass: FileUpload as unknown as Constructor<LitElement>,
  react: React,
  events: {
    onChange: 'gup-change',
onDelete: 'gup-delete',
onInvalid: 'gup-invalid'
  },
  displayName: 'FileUpload'
})

export default reactWrapper;
