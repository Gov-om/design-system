import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './form-list.css?inline';

/**
 * A list of form items
 *
 * @slot - Form items with labels (eg. `gup-input-field`, `gup-file-upload`, `gup-checkbox`, `gup-radio-button-group`)
 */
@customElement('gup-form-list')
export class FormList extends GupComponent {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
