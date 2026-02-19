import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './badge.css?inline';

/**
 * Badge can be used to convey status.
 *
 */
@customElement('gup-badge')
export class Badge extends GupComponent {
  /** The type of the badge */
  @property() type: BadgeType = 'neutral';

  render() {
    return html`
    <div class="${`badge badge--type-${this.type}`}">
    </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}

export type BadgeType = 'neutral' | 'positive' | 'negative' | 'offline';
