import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './labelled-item.css?inline';

import '../track/track';

/**
 * A generic component to label any static content. Produces a form item like layout.
 *
 * @slot - Content to be labelled
 * @slot label - Label for the content
 * @slot icon - A slot for an optional icon in the content area. Insert a gup-icon here. Do not set width and height attributes on the icon, those will be set automatically
 */
@customElement('gup-labelled-item')
export class LabelledItem extends GupComponent {
  render() {
    return html`
      <div class="inner">
        <div class="label" id="label">
          <slot name="label"></slot>
        </div>
        <gup-track class="content" aria-labelledby="label" gap="2">
          <slot name="icon"></slot>
          <slot></slot>
        </gup-track>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
