import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './form-validation-message.css?inline';
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
@customElement('gup-form-validation-message')
export class FormValidationMessage extends GupComponent {
  render() {
    return html`
      <gup-track gap="2" class="inner">
        <gup-icon class="icon" icon-name="error" height="24" width="24"></gup-icon>
        <span><slot></slot></span>
      </gup-track>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
