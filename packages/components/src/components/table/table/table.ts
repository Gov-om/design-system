import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './table.css?inline';

type Slot = HTMLSlotElement | null | undefined;

/**
 * A simple ARIA-based table. Why don't we use a native HTML table? Because native table tags won't work when slotted into light DOM (and when moved manually inside of Shadow DOM external classes will not work).
 *
 * @slot - `gup-table-row` and `gup-table-cell` components
 */
@customElement('gup-table')
export class Table extends GupComponent {
  updated() {
    this.updateSlots();
  }

  private hasHeader() {
    return this.querySelectorAll('gup-table-cell[type="header"]').length > 0;
  }

  /** Allows to manually update the table after modifying its structure */
  public updateSlots(): void {
    const headSlot: Slot = this.shadowRoot?.querySelector('slot[name="head-cells"]');
    headSlot?.assign(...this.querySelectorAll('gup-table-cell[type="header"]'));

    const bodySlot: Slot = this.shadowRoot?.querySelector('slot[name="body-rows"]');
    bodySlot?.assign(...this.querySelectorAll('gup-table-row'));
  }

  render() {
    return html`
      <div role="table" class="table">
        <!-- thead -->
        ${
          this.hasHeader()
            ? html`
          <div role="rowgroup" class="table-section table-section--type-header">
            <div role="row" class="table-row">
              <slot name="head-cells"></slot>
            </div>
          </div>
        `
            : ''
        }
        <!-- tbody -->
        <div role="rowgroup" class="table-section table-section--type-body">
          <slot name="body-rows"></slot>
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
  static shadowRootOptions = { ...LitElement.shadowRootOptions, slotAssignment: 'manual' as SlotAssignmentMode };
}
