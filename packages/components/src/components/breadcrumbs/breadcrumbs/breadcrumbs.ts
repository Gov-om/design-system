import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './breadcrumbs.css?inline';

/**
 * A set of breadcrumbs.
 *
 * @slot - A slot for `gup-breadcrumbs-item` elements
 */
@customElement('gup-breadcrumbs')
export class Breadcrumbs extends GupComponent {
  render() {
    return html`
      <div class="track" role="list">
        <slot></slot>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
