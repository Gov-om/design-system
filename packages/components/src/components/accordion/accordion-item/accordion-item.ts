import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './accordion-item.css?inline';
import '../../track/track';
import '../accordion-item-action/accordion-item-action';

/**
 * An accordion item. Put them together to have an accordion. Note that this component can be used in both accordion and stepper.
 *
 * @slot - The collapsible content of an item
 * @slot label - The label
 *
 * @dependency gup-track
 * @dependency gup-accordion-item-action
 *
 * @event gup-toggle - Emitted when the item toggles.
 */
@customElement('gup-accordion-item')
export class AccordionItem extends GupComponent {
  /** A translatable label for the Show indicator */
  @property({ attribute: 'label-show' }) labelShow = 'Show';

  /** A translatable label for the Hide indicator */
  @property({ attribute: 'label-hide' }) labelHide = 'Hide';

  /** Whether the accordion item is open by default */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Whether to hide the show/hide controls */
  @property({ type: Boolean, attribute: 'hide-controls' }) hideControls = false;

  onToggle(event: Event) {
    const open = (event.target as HTMLDetailsElement)?.open;
    this.dispatchEvent(
      new CustomEvent('gup-toggle', {
        detail: open,
      })
    );
    this.open = open;
  }

  render() {
    return html`
      <details class="inner" ?open=${this.open} @toggle=${this.onToggle}>
        <summary class="label">
          <gup-track gap="4" vertical-alignment="top">
            <span class="label-inner"><slot name="label"></slot></span>
            ${
              !this.hideControls
                ? html`<gup-accordion-item-action icon-name=${this.open ? 'remove-circle-outline' : 'add-circle-outline'}>
                  ${this.open ? this.labelHide : this.labelShow}
                </gup-accordion-item-action>`
                : ''
            }
          </gup-track>
        </summary>
        <div class="content">
          <slot></slot>
        </div>
      </details>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
