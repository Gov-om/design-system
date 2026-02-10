import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import '../track/track';
import type { TrackDirection } from '../track/track.type';

/**
 * A group of buttons
 *
 * @slot - Only `gup-button` elements are allowed as children
 *
 * @dependency gup-track
 */
@customElement('gup-button-group')
export class ButtonGroup extends GupComponent {
  /** The direction of the button group */
  @property({ reflect: true }) direction: TrackDirection = 'horizontal';
  render() {
    return html`
      <gup-track direction="${this.direction}" gap="4" vertical-alignment="center">
        <slot></slot>
      </gup-track>
    `;
  }
}
