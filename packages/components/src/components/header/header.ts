import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './header.css?inline';
import '../logo/logo';

/**
 * The header of the service. It contains the service name and the action buttons.
 *
 * @slot start - Buttons at the start of the header
 * @slot end - Buttons at the end of the header
 *
 * @dependency gup-logo
 */
@customElement('gup-header')
export class Header extends GupComponent {
  /** The aria label of the navigation */
  @property({ attribute: 'nav-aria-label' }) navAriaLabel = 'Navigation';

  render() {
    return html`
     <header class="inner">
      <nav class="navigation" aria-label="${this.navAriaLabel}">
        <slot name="start"></slot>
        <div class="logo-wrapper">
          <gup-logo size="45" title="Logo"></gup-logo>
        </div>
        <slot name="end"></slot>
      </nav>
    </header>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
