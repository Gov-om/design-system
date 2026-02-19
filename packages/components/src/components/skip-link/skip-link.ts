import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './skip-link.css?inline';

/**
 * An anchor link that skips the header navigation and sends the user to the main content on the page
 *
 * @slot - Skip link label. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive content like links or buttons
 */
@customElement('gup-skip-link')
export class SkipLink extends GupComponent {
  /** An anchor (including `#`) to a block with the main content. Make sure there's an element with this `id` on the page! */
  @property() href = '#main-content';

  render() {
    return html`
      <a class="link" href=${this.href}><slot></slot></a>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
