import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './flyout.css?inline';
import '../icon/icon';
import { event, EventDispatcher } from '../../utils/decorators/event';

export type FlyoutPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * A flyout panel component that slides in from the edge of the screen.
 *
 * @slot - Main content of the flyout
 * @slot footer - A slot for footer content (typically action buttons)
 *
 * @cssprop --gup-flyout--width - Flyout width (for left/right positions)
 * @cssprop --gup-flyout--height - Flyout height (for top/bottom positions)
 * @cssprop --gup-flyout--z-index - The z-index value for the flyout
 *
 * @event gup-flyout-open - Fires when the flyout is opened
 * @event gup-flyout-close - Fires when the flyout is closed
 *
 * @dependency gup-icon
 */
@customElement('gup-flyout')
export class Flyout extends GupComponent {
  /** The heading text of the flyout */
  @property() heading = '';

  /** Position of the flyout panel */
  @property({ reflect: true }) position: FlyoutPosition = 'right';

  /** Whether the flyout is currently open */
  @property({ reflect: true, type: Boolean }) open = false;

  /** Whether to hide a close button in the header */
  @property({ reflect: true, type: Boolean, attribute: 'hide-close-button' }) hideCloseButton = false;

  /** Translatable close button label */
  @property({ attribute: 'close-label' }) closeLabel = 'Close';

  /** Whether to show backdrop when flyout is open */
  @property({ reflect: true, type: Boolean }) backdrop = true;

  /** The element that had focus before the flyout was opened (to restore focus when closed) */
  @state() private previousFocus: HTMLElement | null = null;

  @event('gup-flyout-open') private onOpen!: EventDispatcher<void>;
  @event('gup-flyout-close') private onClose!: EventDispatcher<void>;

  private boundEscKeyHandler = this.handleEscKey.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.boundEscKeyHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.boundEscKeyHandler);
    this.restoreBodyScroll();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClosed();
      }
    }
  }

  /** Opens the flyout panel */
  public show(): void {
    this.open = true;
  }

  /** Closes the flyout panel */
  public hide(): void {
    this.open = false;
  }

  /** Toggles the flyout panel */
  public toggle(): void {
    this.open = !this.open;
  }

  private handleOpen() {
    this.previousFocus = document.activeElement as HTMLElement;
    if (this.previousFocus?.shadowRoot) {
      this.previousFocus = this.previousFocus.shadowRoot.activeElement as HTMLElement;
    }
    if (this.backdrop) {
      document.body.style.overflow = 'hidden';
    }
    this.onOpen();

    // Focus the close button or content after opening
    this.updateComplete.then(() => {
      const closeButton = this.shadowRoot?.querySelector('.close-button') as HTMLElement;
      const content = this.shadowRoot?.querySelector('.flyout-content') as HTMLElement;
      if (closeButton && !this.hideCloseButton) {
        closeButton.focus();
      } else if (content) {
        content.focus();
      }
    });
  }

  private handleClosed() {
    this.restoreBodyScroll();
    this.restoreFocus();
    this.onClose();
  }

  private restoreBodyScroll() {
    document.body.style.overflow = '';
  }

  private restoreFocus() {
    if (this.previousFocus && this.previousFocus.isConnected) {
      if (typeof this.previousFocus?.focus === 'function') {
        setTimeout(() => this.previousFocus?.focus());
      }
    }
  }

  private handleEscKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open) {
      this.hide();
    }
  }

  private handleBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('flyout-backdrop')) {
      this.hide();
    }
  }

  private handleBackdropKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      if (target.classList.contains('flyout-backdrop')) {
        event.preventDefault();
        this.hide();
      }
    }
  }

  private handleCloseClick() {
    this.hide();
  }

  render() {
    if (!this.open) {
      return nothing;
    }

    return html`
      <div 
        class="flyout-backdrop"
        @click="${this.handleBackdropClick}"
        @keydown="${this.handleBackdropKeydown}"
      >
        <div
          class="flyout-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="flyout-heading"
        >
          <div class="flyout-header">
            <h2 id="flyout-heading" class="flyout-heading">${this.heading}</h2>
            ${
              this.hideCloseButton
                ? nothing
                : html`
                  <button
                    class="close-button"
                    @click="${this.handleCloseClick}"
                    aria-label="${this.closeLabel}"
                    title="${this.closeLabel}"
                  >
                    <gup-icon class="close-icon" icon-name="close"></gup-icon>
                  </button>
                `
            }
          </div>
          <div class="flyout-content" tabindex="0">
            <slot></slot>
          </div>
          <div class="flyout-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
