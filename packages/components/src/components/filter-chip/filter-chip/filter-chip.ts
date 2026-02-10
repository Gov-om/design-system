import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './filter-chip.css?inline';
import '../../icon/icon';

/**
 * Filter chip is used to display user selected filters.
 *
 * @slot - Chip label content. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive elements like links or buttons
 *
 * @event gup-click - Emitted on click. Only relevant if `kind=button`
 *
 * @dependency gup-icon
 */
@customElement('gup-filter-chip')
export class FilterChip extends GupComponent {
  /** The role of the component should be chosen between link or button */
  @property({ reflect: true }) kind: 'link' | 'button' = 'button';

  /** Whether the chip button is disabled. Only relevant if `kind=button` */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Only relevant if `kind='link'` */
  @property({ type: String, reflect: true }) href = '';

  /** Makes close icon hidden when true. Only relevant if `kind=button` */
  @property({ type: Boolean, reflect: true, attribute: 'hide-close-icon' }) hideCloseIcon = false;

  onClick(clickEvent: Event) {
    this.dispatchEvent(new CustomEvent('gup-click', clickEvent));
  }

  render() {
    return html`
      ${
        this.kind === 'link'
          ? html`
        <a href="${this.href}" class="button">
          <slot></slot>
        </a>
      `
          : html`
       <button class="button" ?disabled="${this.disabled}" @click=${this.onClick}>
        <slot></slot>
        ${
          this.hideCloseIcon
            ? ''
            : html`
         <gup-icon icon-name="close" height="24" width="24" class="icon"></gup-icon>
         `
        }

      </button>
      `
      }

    `;
  }

  static readonly styles = unsafeCSS(styles);
}
