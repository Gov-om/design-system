import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement } from 'lit/decorators.js';
import styles from './form-section.css?inline';
import { HasSlotController } from '../../utils/slot-controller';

/**
 * A section in a long form with a mandatory heading an an optional footer
 *
 * @slot - The main content (eg a group of form fields that need to have a title)
 * @slot title - The title for the section
 * @slot footer - A footer with action buttons. Only use with gup-button-group
 */
@customElement('gup-form-section')
export class FormSection extends GupComponent {
  private readonly hasSlotController = new HasSlotController(this, 'footer');

  render() {
    return html`
      <section class="inner${this.hasSlotController.test('footer') ? ' inner--has-footer' : ''}">
        <h2 class="title"><slot name="title"></slot></h2>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </section>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
