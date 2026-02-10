import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './form-hint.css?inline';

/**
 * A form hint is a small text that provides additional information about a form field. This component is used internally by other form components.
 *
 * @slot - The content of the hint
 */
@customElement('gup-form-hint')
export class FormHint extends GupComponent {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
