import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';

/**
 * A wrapper for accordion items
 *
 * @slot - only `gup-accordion-item` elements
 */
@customElement('gup-accordion')
export class Accordion extends GupComponent {
  render() {
    return html`<slot></slot>`;
  }
}
