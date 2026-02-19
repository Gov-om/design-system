import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './screenreader-text.css?inline';
import { GupComponent } from '../../styles/styles';

/**
 * Text visible to screenreaders only
 *
 * @slot - A slot for text content
 */
@customElement('gup-screenreader-text')
export class ScreenreaderText extends GupComponent {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
