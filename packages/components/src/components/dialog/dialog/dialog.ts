import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './dialog.css?inline';
import '../../icon/icon';
import { event, EventDispatcher } from '../../../utils/decorators/event';

/**
 * A modal component that represents a dialog window.
 *
 * @slot - Main content of the modal
 * @slot action-buttons - A slot for action buttons (typically "Cancel" and "Confirm" buttons wrapped in a `gup-button-group`)
 *
 * @event gup-close - Fires when the modal is closed
 *
 * @dependency gup-icon
 */
@customElement('gup-dialog')
export class Dialog extends GupComponent {
  /** The heading text of the modal */
  @property() heading = '';

  /** Whether to hide a close button in the header */
  @property({ reflect: true, type: Boolean, attribute: 'hide-close-button' }) hideCloseButton = false;

  /** Translatable close button label */
  @property({ attribute: 'close-label' }) closeLabel = 'Close';

  /** The element that had focus before the modal was opened (to restore focus when closed) */
  @state() private previousFocus: HTMLElement | null = null;

  @event('gup-close') private onClose!: EventDispatcher<void>;

  /** @internal */
  @query('.close-button') private closeButton!: HTMLElement;
  /** @internal */
  @query('.modal-content') private modalContent!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.previousFocus = document.activeElement as HTMLElement;
    if (this.previousFocus?.shadowRoot) {
      this.previousFocus = this.previousFocus.shadowRoot.activeElement as HTMLElement;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.previousFocus && this.previousFocus.isConnected) {
      if (typeof this.previousFocus?.focus === 'function') {
        setTimeout(() => this.previousFocus?.focus());
      }
    }
  }

  async firstUpdated() {
    if (this.hideCloseButton) {
      this.modalContent.focus();
    } else {
      this.closeButton.focus();
    }
  }

  private handleClose() {
    this.onClose();
  }

  render() {
    return html`
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
        <gup-icon class="icon" icon-name="info" height="16" width="16"></gup-icon>
        <div class="modal-header">
          <h2 id="modal-heading" class="modal-heading">${this.heading}</h2>
          ${
            this.hideCloseButton
              ? nothing
              : html`
                <button
                  class="close-button"
                  @click="${this.handleClose}"
                  aria-label="${this.closeLabel}"
                  title="${this.closeLabel}"
                >
                  <gup-icon class="close-icon" icon-name="close"></gup-icon>
                </button>
              `
          }
        </div>
        <div class="modal-content" tabindex="0">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="action-buttons"></slot>
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
