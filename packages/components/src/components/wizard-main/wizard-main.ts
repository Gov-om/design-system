import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './wizard-main.css?inline';

/**
 * Main content of a service wizard (between header and footer)
 *
 * @slot - Content of a wizard step
 */
@customElement('gup-wizard-main')
export class WizardMain extends GupComponent {
  render() {
    return html`
      <div class="inner">
        <slot></slot>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
