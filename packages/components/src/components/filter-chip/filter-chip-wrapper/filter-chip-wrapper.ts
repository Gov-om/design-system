import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './filter-chip-wrapper.css?inline';
import '../../track/track';
import '../../button/button';
import '../../icon/icon';

/**
 * Filter chip wrapper is used to group filter chips together.
 *
 * @slot - only `gup-filter-chip`
 * @slot label - A group label
 *
 * @event gup-click - Emitted when the 'clear all' button is clicked
 *
 * @dependency gup-icon
 * @dependency gup-button
 * @dependency gup-track
 */
@customElement('gup-filter-chip-wrapper')
export class FilterChipWrapper extends GupComponent {
  /** Label for a 'clear all' button */
  @property({ reflect: true, attribute: 'clear-label' }) clearLabel = '';

  onClick(clickEvent: Event) {
    this.dispatchEvent(new CustomEvent('gup-click', clickEvent));
  }

  render() {
    return html`
        <gup-track vertical-alignment="center" class="track" gap="4" ?is-multiline="${true}">
          <span class="label"><slot name="label"></slot></span>
          <slot></slot>
          ${
            this.clearLabel &&
            html`
          <gup-button appearance="secondary" @gup-click=${this.onClick}>
            <gup-icon icon-name="refresh" height="20" width="20"></gup-icon>
            ${this.clearLabel}
          </gup-button>
          `
          }
        </gup-track>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
