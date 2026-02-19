import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './page-status.css?inline';
import '../icon/icon';

/**
 * A Page status component with various visual states and a placeholder for an action
 *
 * @slot - A slot for content
 * @slot title - A slot for content title. Note it is internally wrapped into a heading tag, so only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content) is allowed
 * @slot action - A slot to insert an action, usually a `gup-button-group` or a `gup-button`.
 *
 * @dependency gup-icon
 */
@customElement('gup-page-status')
export class PageStatus extends GupComponent {
  /** Status of the page */
  @property({ reflect: true }) type: 'success' | 'error' | 'expired' = 'success';

  render() {
    const iconName = this.type === 'success' ? 'done' : this.type === 'error' ? 'close' : this.type === 'expired' ? 'priority-high' : 'cancel';
    const iconSize = 32;

    return html`
      <div class="icon-wrapper">
        <gup-icon class="icon" icon-name="${iconName}" width="${iconSize}" height="${iconSize}"></gup-icon>
      </div>
      <div class="content">
        <h2 class="title">
          <slot name="title"></slot>
        </h2>
        <div class="message">
          <slot></slot>
        </div>
      </div>
      <slot name="action"></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
