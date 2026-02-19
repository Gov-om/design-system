import { TemplateResult, html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './tooltip.css?inline';
import { Placement } from '@floating-ui/dom';
import { GenericPopup } from '../components';
import { ReferenceElement } from '@floating-ui/core';
import { EventDispatcher, event } from '../../utils/decorators/event';
import { isEmpty } from '../../utils/helpers';

/**
 * A generic tooltip
 *
 * @slot - Content of the tooltip
 *
 * @cssprop --gup-tooltip--max-width - Tooltip max-width
 * @cssprop --gup-tooltip--max-height - Tooltip max-height
 *
 * @event gup-tooltip-show - Dispatched when tooltip is shown
 * @event gup-tooltip-hide - Dispatched when tooltip is hidden
 *
 * @dependency gup-generic-popup
 */
@customElement('gup-tooltip')
export class Tooltip extends GupComponent {
  @query('.popup') private _genericPopup!: GenericPopup;

  /** Title of the tooltip */
  @property({ type: String }) title: string = '';

  /** Optional hint for the tooltip */
  @property({ type: String }) hint?: string = '';

  /**
   * Target element id or reference element to which the tooltip is attached
   */
  @property({ type: String }) target: string | ReferenceElement = '';

  /**
   * Sets placement of the popup relative to the target element. Only applies if there is enough space on screen
   */
  @property({ type: String }) placement: Placement = 'bottom';

  /** Displace the popup from the target element */
  @property({ type: Number }) offset = 8;

  /** Sets maximum width. You can change the width using --gup-tooltip--max-width css property as well (it will override the prop) */
  @property({ attribute: 'max-width', type: Number }) maxWidth: number = 200;

  /**
   * Sets maximum height. A scrollbar appears if content overflows. You can change the height using `--gup-tooltip--max-height` css property as well
   */
  @property({ attribute: 'max-height', type: Number }) maxHeight: number = 150;

  @event('gup-tooltip-show') private onShow!: EventDispatcher<Element>;

  @event('gup-tooltip-hide') private onHide!: EventDispatcher<Element>;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('maxWidth') || changedProperties.has('maxHeight')) {
      this.style.setProperty('--max-width', `${this.maxWidth}px`);
      this.style.setProperty('--max-height', `${this.maxHeight}px`);
    }
  }

  /** Displays the tooltip */
  public showTooltip(): void {
    this._genericPopup.target = this.target;
    this._genericPopup.show();
    this.onShow(this);
  }

  hideTooltip() {
    this._genericPopup.hide();
    this.onHide(this);
  }

  private renderHint(): TemplateResult {
    return !isEmpty(this.hint) ? html`<div class="hint">${this.hint}</div>` : html``;
  }

  render() {
    return html`
      <gup-generic-popup class="popup" .target="${this.target}" .placement="${this.placement}">
        <div class="content" tabindex="0">
          <h2 class="title">${this.title}</h2>
          ${this.renderHint()}
          <slot></slot>
        </div>
      </gup-generic-popup>
    `;
  }
  static readonly styles = unsafeCSS(styles);
}
