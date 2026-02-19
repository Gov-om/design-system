import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './table-cell.css?inline';

/**
 * A cell of a `gup-table`. To be used inside `gup-table-row`.
 *
 * @slot - Content of the cell
 */
@customElement('gup-table-cell')
export class TableCell extends GupComponent {
  /** Cell type. `type="header"` is used for column headers, `type="rowheader"` is used for row headers */
  @property() type: 'header' | 'rowheader' | 'body' = 'body';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      if (this.type === 'header') {
        this.setAttribute('role', 'columnheader');
      } else if (this.type === 'rowheader') {
        this.setAttribute('role', 'rowheader');
      } else {
        this.setAttribute('role', 'cell');
      }
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
  static readonly styles = unsafeCSS(styles);
}
