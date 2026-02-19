import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './avatar.css?inline';
import '../icon/icon';
import '../badge/badge';
import { type BadgeType } from '../badge/badge';

/**
 * Avatar for a user with an a name abbreviation or an image.
 *
 * @dependency gup-icon
 * @dependency gup-badge
 */
@customElement('gup-avatar')
export class Avatar extends GupComponent {
  /** Regulate size with size property */
  @property() size: 's' | 'm' | 'l' = 's';

  /** Set image description. Used if image source is provided */
  @property() alt = '';

  /** Set image source for user photo */
  @property() src = '';

  /** Label is used if no image provided */
  @property() label? = '';

  /** The type of the status */
  @property() status?: BadgeType;

  private sizeMap = {
    s: { size: 20, fontSize: 'var(--font-size-90)', iconSize: 16 },
    m: { size: 28, fontSize: 'var(--font-size-250)', iconSize: 20 },
    l: { size: 40, fontSize: 'var(--font-size-400)', iconSize: 28 },
  };

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('size')) {
      const { size, fontSize } = this.sizeMap[this.size] || this.sizeMap['s'];

      this.style.setProperty('--size', `${size}px`);
      this.style.setProperty('--font-size', fontSize);
    }
  }

  render() {
    const abbr = this.label?.match(/[A-Z]/g)?.join('');
    const { iconSize } = this.sizeMap[this.size] || this.sizeMap['s'];

    return html`
      <div class="avatar">
        ${
          this.src && this.alt
            ? html`<img class="image" alt="${this.alt}" src="${this.src}" />`
            : html`
            <div class="label">
              ${this.label ? html`${abbr}` : html`<gup-icon class="icon" icon-name="person" height="${iconSize}" width="${iconSize}"></gup-icon>`}
            </div>
          `
        }
          ${
            this.status
              ? html`
            <div class="badge">
              <gup-badge type="${this.status}"></gup-badge>
            </div>`
              : null
          }
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
