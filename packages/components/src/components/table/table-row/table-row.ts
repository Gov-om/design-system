import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './table-row.css?inline';

/**
 * A table row. To be used inside `gup-table`.
 *
 * @slot - Only gup-table-cell elements
 */
@customElement('gup-table-row')
export class TableRow extends GupComponent {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'row');
    }
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

  static readonly styles = unsafeCSS(styles);
}
