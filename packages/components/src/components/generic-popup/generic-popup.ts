import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property, query, state } from 'lit/decorators.js';
import styles from './generic-popup.css?inline';
import { Middleware, Placement, arrow, autoUpdate, computePosition, flip, inline, offset, shift } from '@floating-ui/dom';
import { EventDispatcher, event } from '../../utils/decorators/event';

/**
 * A low-level, generic, styleless popup that can be attached to an element in the body of a page.
 * Use it to create dropdowns, popovers, tooltips etc.
 * Note that this component does not automatically provide any styling or markup required for different use cases, you need to add it yourself.
 *
 * @slot - Main slot for the content to be popped up
 *
 * @event gup-popup-show - Fires when the popup is shown
 * @event gup-popup-hide - Fires when popup becomes hidden
 *
 * @cssprop --gup-generic-popup--arrow-background-color change the background color for the arrow
 * @cssprop --gup-generic-popup--arrow-border-color change the border color for the arrow
 * @cssprop --gup-generic-popup--arrow-border-size change the border size for the arrow
 * @cssprop --gup-generic-popup--arrow-size change the size of the arrow
 */
@customElement('gup-generic-popup')
export class GenericPopup extends GupComponent {
  /** Sets placement of the popup relative to the target element. Only applies if there is enough space on screen */
  @property() placement: Placement = 'bottom';

  /** Displace the popup from the target element, in px */
  @property({ type: Number }) offset = 5;

  /** Whether to show the popup arrow or not (we can fine-tune it using CSS) */
  @property({ type: Boolean, reflect: true }) showArrow = true;

  @query('.popup') private _popupElement!: HTMLElement;
  @query('.arrow') private _arrowElement!: HTMLElement;

  /** @private */
  @state() isVisible = false;

  /** Fires when the popup is shown */
  @event('gup-popup-show') private onPopupShow!: EventDispatcher<Element>;

  /** Fires when popup becomes hidden */
  @event('gup-popup-hide') private onPopupHide!: EventDispatcher<Element>;

  /** @private */
  @state() _target!: Element;

  /**
   * The target element selector to which the popup will be attached
   *
   * @internal
   */
  @property({ type: Object })
  get target(): Element {
    return this._target;
  }

  set target(value: string | Element) {
    if (typeof value === 'string') {
      this._target = document.getElementById(value) as Element;
    } else if (value instanceof Element) {
      this._target = value;
    } else {
      console.warn('gup-generic-popup target only accepts an Element instance or a string id of a DOM element.');
    }
  }

  private getMiddleware(): Middleware[] {
    const middlewareParams: Middleware[] = [];
    middlewareParams.push(offset(this.offset), flip(), inline(), shift({ padding: 4 }));
    // arrow should always be placed last
    middlewareParams.push(arrow({ element: this._arrowElement, padding: 5 }));

    return middlewareParams;
  }

  private popupAutoUpdateCleanup!: () => void;

  private setPopup() {
    if (this.target) {
      this.popupAutoUpdateCleanup = autoUpdate(this.target, this._popupElement, () => {
        computePosition(this.target, this._popupElement, {
          placement: this.placement,
          middleware: this.getMiddleware(),
          strategy: 'absolute',
        }).then(({ x, y, placement, middlewareData }) => {
          Object.assign(this._popupElement.style, {
            left: `${x}px`,
            top: `${y}px`,
          });

          if (middlewareData.arrow && this.showArrow) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;

            this._arrowElement.dataset.placement = placement;

            Object.assign(this._arrowElement.style, {
              left: arrowX != null ? `${arrowX}px` : '',
              top: arrowY != null ? `${arrowY}px` : '',
              right: '',
              bottom: '',
            });
          }
        });
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._handlePopupShowEvent = this._handlePopupShowEvent.bind(this);
    this.handleKeydownEvent = this.handleKeydownEvent.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.popupAutoUpdateCleanup?.();
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this.target as HTMLElement) && !eventPath.includes(this)) {
      this.hide();
    }
  };

  private handleKeydownEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isVisible) {
      this.hide();
    }
  };

  private _handlePopupShowEvent(event: Event) {
    if (event.target !== this) {
      const { parentElement } = event.target as HTMLElement;
      const isNestedPopover = this.contains(parentElement);

      if (!isNestedPopover) {
        this.hide();
      }
    }
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('isVisible')) {
      this._popupElement.style.setProperty('--display-popup', `${this.isVisible ? 'block' : 'none'}`);
    }
  }
  /**
   * Shows the popup
   */
  show() {
    this.toggle();
    this.setPopup();
    this.onPopupShow(this._popupElement);
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleKeydownEvent);
    document.addEventListener('gup-popup-show', this._handlePopupShowEvent);
  }

  /**
   * Hides the popup
   */
  hide() {
    this.isVisible = false;
    this.popupAutoUpdateCleanup?.();
    this.onPopupHide(this._popupElement);
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleKeydownEvent);
    document.removeEventListener('gup-popup-show', this._handlePopupShowEvent);
  }

  private renderArrow() {
    return this.showArrow ? html`<div id="arrow" class="arrow"></div>` : html``;
  }

  render() {
    return html`
      <div class="popup">
        <slot></slot>
        ${this.renderArrow()}
      </div>
    `;
  }
  static readonly styles = unsafeCSS(styles);
}
