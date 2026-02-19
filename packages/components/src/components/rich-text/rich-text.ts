import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './rich-text.css?inline';

/**
 * A container for rich text content such as article body or any other content containing user-generated text with HTML markup
 *
 * @slot - HTML content
 */
@customElement('gup-rich-text')
export class RichText extends GupComponent {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
