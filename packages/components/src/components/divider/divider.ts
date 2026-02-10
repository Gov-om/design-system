import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './divider.css?inline';

/**
 * A simple divider component that can be used to separate content. It can be placed at the top, bottom, or both of the content. The content goes in the slot.
 *
 * @slot - The content to be separated
 */
@customElement('gup-divider')
export class Divider extends GupComponent {
  /** The style of the divider */
  @property() appearance: 'default' | 'secondary' | 'inverse' = 'default';

  /** The location of the divider */
  @property() location: 'bottom' | 'top' | 'top-and-bottom' = 'bottom';

  /** The gap between the divider and the content */
  @property({ type: Number }) gap = 4;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('gap')) {
      this.style.setProperty('--gap', `calc(${this.gap} * var(--unit))`);
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
