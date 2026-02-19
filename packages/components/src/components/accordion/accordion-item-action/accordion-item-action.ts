import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import { GupIconName } from '@govom/icons/dist/index.d';
import styles from './accordion-item-action.css?inline';
import '../../track/track';
import '../../icon/icon';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * An accordion item toggle action. Used inside gup-accordion-item or on its own. Note this is not a button or link.
 *
 * @slot - The label
 *
 * @dependency gup-icon
 */
@customElement('gup-accordion-item-action')
export class AccordionItemAction extends GupComponent {
  /** Icon name */
  @property({ attribute: 'icon-name' }) iconName?: GupIconName | string;

  render() {
    return html`
      <gup-icon icon-name=${ifDefined(this.iconName)} width="24" height="24"></gup-icon>
      <div class="slot-container"><slot></slot></div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
