import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './logo.css?inline';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import gupHorizontalLogo from './images/horizontal-logo.svg?raw';
import gupVerticalLogo from './images/vertical-logo.svg?raw';
import gupIconLogo from './images/icon-logo.svg?raw';

import '../screenreader-text/screenreader-text';

/**
 * A logo component that contains lockups with different variations
 *
 * @cssprop --gup-logo--color - Logo color when inverted is custom
 *
 * @dependency gup-screenreader-text
 */
@customElement('gup-logo')
export class Logo extends GupComponent {
  /** The appearance of the logo, can be an icon only * or horizontal and vertical with locked text */
  @property() appearance: 'icon' | 'horizontal' | 'vertical' = 'icon';

  /** An accessible description of the logo and a tooltip that appears on hover */
  @property({ attribute: 'title', reflect: true }) label = 'Logo';

  /** Whether or not should the logo colors be inverted; useful for dark backgrounds */
  @property() inverted: 'disabled' | 'enabled' | 'custom' = 'disabled';

  /** Optional link for the logo */
  @property() href = '';

  /** The size of the logo (defines height, the logo width scales proportionally) */
  @property({ type: Number }) size = 24;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('size')) {
      this.style.setProperty('--size', `${this.size}px`);
    }
  }

  /**
   * unsafeSVG should be fine here since the SVGs are static and not user-generated
   */
  private renderVerticalLogo = () => unsafeSVG(gupVerticalLogo);
  private renderHorizontalLogo = () => unsafeSVG(gupHorizontalLogo);
  private renderIconLogo = () => unsafeSVG(gupIconLogo);

  renderLogo() {
    if (this.appearance === 'vertical') {
      return this.renderVerticalLogo();
    }
    if (this.appearance === 'horizontal') {
      return this.renderHorizontalLogo();
    }
    return this.renderIconLogo();
  }

  render() {
    if (this.href) {
      return html`
        <a class="link" href="${this.href}">
          ${this.renderLogo()}
          <gup-screenreader-text>${this.label}</gup-screenreader-text>
        </a>
      `;
    } else {
      return html`
        ${this.renderLogo()}
        <gup-screenreader-text>${this.label}</gup-screenreader-text>
      `;
    }
  }

  static readonly styles = unsafeCSS(styles);
}
