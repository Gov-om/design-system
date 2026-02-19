import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './banner.css?inline';
import '../icon/icon';
import '../button/button';

/**
 * A banner component with various visual states and a close action
 *
 * @slot - A slot for banner content
 * @slot title - A slot for banner title. Note it is internally wrapped into a heading tag, so only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content) is allowed
 * @slot action-buttons - A slot to insert a `gup-button-group` with exactly two action buttons
 *
 * @event gup-close - Emitted when the close-button is clicked
 *
 * @cssprop --gup-banner--width - Banner max-width
 *
 * @dependency gup-icon
 */
@customElement('gup-banner')
export class Banner extends GupComponent {
  /** Status of banner */
  @property() type: 'neutral' | 'success' | 'warning' | 'error' = 'neutral';

  /** Visual style */
  @property() appearance: 'outline' | 'filled' = 'outline';

  /** Label for close button. Only relevant if `show-close-button="true"` */
  @property({ attribute: 'close-label', reflect: true }) closeLabel = 'Close';

  /** Display close button? */
  @property({ attribute: 'show-close-button', type: Boolean, reflect: true }) showCloseButton = false;

  /** Display status icon? */
  @property({ attribute: 'hide-icon', type: Boolean, reflect: true }) hideIcon = false;

  onClick(clickEvent: Event) {
    this.dispatchEvent(new CustomEvent('gup-close', clickEvent));
  }

  render() {
    const iconName = this.type === 'neutral' ? 'info' : this.type === 'warning' ? 'priority-high' : this.type === 'success' ? 'check-circle' : 'cancel';
    const iconSize = this.type === 'warning' ? 16 : 34;

    return html`
      <div class="inner">
        ${
          this.showCloseButton
            ? html`
              <button class="close-button" @click="${this.onClick}" aria-label="${this.closeLabel}" title="${this.closeLabel}">
                <gup-icon class="close" icon-name="close" height="24" width="24"></gup-icon>
              </button>`
            : ''
        }
        <div class="track">
          ${!this.hideIcon ? html`<gup-icon class="icon" icon-name="${iconName}" height="${iconSize}" width="${iconSize}"></gup-icon>` : ''}
          <h2 class="title"><slot name="title"></slot></h2>
          <div class="content">
            <div class="message">
              <slot></slot>
            </div>
            <slot name="action-buttons"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
