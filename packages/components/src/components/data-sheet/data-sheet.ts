import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './data-sheet.css?inline';
import '../track/track';
import '../icon/icon';

/**
 * A form validation message is a component that outputs field-specific validation message. This component is used internally by other form components.
 *
 * @slot - The content of the message
 *
 * @dependency gup-icon
 * @dependency gup-track
 */
@customElement('gup-data-sheet')
export class DataSheet extends GupComponent {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
