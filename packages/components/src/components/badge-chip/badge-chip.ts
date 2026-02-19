import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './badge-chip.css?inline';
import '../avatar/avatar';
/**
 * Badge chip is a component that can be used to convey status.
 *
 * @slot - The content of the badge chip
 *
 * @slot thumbnail - An image or an avatar to be displayed as a thumbnail
 * @slot prefix - The content before the badge (usually an icon)
 * @slot suffix - The content after the badge (usually an icon)
 */
@customElement('gup-badge-chip')
export class BadgeChip extends GupComponent {
  /** Appearance of the badge. Could be used to indicate the status of the badge */
  @property({ reflect: true }) appearance: 'neutral' | 'positive' | 'warning' | 'negative' | 'brand' = 'neutral';

  /** Whether to show a filled (strong) background color or a light one */
  @property({ type: Boolean, reflect: true, attribute: 'is-filled' }) isFilled = false;

  /** Use this property when the badge contains only an icon. You must insert a `gup-icon` in the default slot */
  @property({ type: Boolean, reflect: true, attribute: 'with-icon-only' }) withIconOnly = false;

  private _isThumbnailSlotUsed(): boolean {
    const isUsed = !!this.querySelector('[slot="thumbnail"]');
    if (isUsed) {
      this.setAttribute('has-thumbnail', '');
    }
    return isUsed;
  }

  private _renderThumbnail() {
    return html`
        ${
          this._isThumbnailSlotUsed()
            ? html` <div class="thumbnail">
        <slot name="thumbnail">
        </slot>
      </div>`
            : nothing
        }
    `;
  }

  render() {
    return html`
      ${this._renderThumbnail()}
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
