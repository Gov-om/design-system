import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './wizard-footer.css?inline';

/**
 * Footer of a service wizard. It contains action buttons to navigate through the wizard
 *
 * @slot start - Action buttons at the start of the footer
 * @slot end - Action buttons at the end of the footer. Wrap multiple buttons in a div
 */
@customElement('gup-wizard-footer')
export class WizardFooter extends GupComponent {
  render() {
    return html`
      <footer class="inner">
        <div class="track">
          <slot name="start"></slot>
          <slot name="end"></slot>
        </div>
      </footer>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
