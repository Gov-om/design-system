import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import { HasSlotController } from '../../utils/slot-controller';
import styles from './callout.css?inline';
import '../icon/icon';

/**
 * A callout is a block quote with an optional author name.
 *
 * @slot - The content of the callout (eg. quote text)
 * @slot title - The title of the callout (eg. quote heading text). Note it is internally wrapped into a heading tag, so only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content) is allowed
 * @slot footer - The footer of the callout (eg. footer name)
 *
 * @dependency gup-icon
 */
@customElement('gup-callout')
export class Callout extends GupComponent {
  /** Visual appearance */
  @property({ reflect: true }) appearance: 'default' | 'background' | 'border' = 'default';

  private readonly hasSlotController = new HasSlotController(this, 'title', 'footer');

  render() {
    return html`
      <div class="inner">
        ${
          this.hasSlotController.test('title')
            ? html`
            <div class="header">
              <gup-icon class="icon" icon-name="format-quote"
              width="24" height="24"></gup-icon>
              <h2 class="title">
                <slot name="title"></slot>
              </h2>
            </div>
          `
            : ''
        }
        <div class="content"><slot></slot></div>
        ${this.hasSlotController.test('footer') ? html`<div class="footer"><slot name="footer"></slot></div>` : ''}
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
