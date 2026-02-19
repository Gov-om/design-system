import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './dialog-container.css?inline';
import '../dialog/dialog';
import { DialogOptions } from '../../../utils/types/dialog.type';
import { Dialog } from '../dialog/dialog';

/**
 * A container for dialogs. Create dialogs using the `createDialog()` method.
 *
 * @slot - Main slot. Only intended for `gup-dialog` elements
 *
 * @cssprop --gup-dialog--z-index - The z-index value for the dialog container
 *
 * @dependency gup-dialog
 */
@customElement('gup-dialog-container')
export class DialogContainer extends GupComponent {
  /** A selector (compatible with `querySelector`) to an element that will become inert when a dialog opens. If not specified, will try to select the `previousElementSibling` */
  @property({ attribute: 'content-selector' }) contentSelector = '';

  private activeDialogs: Set<HTMLElement> = new Set();
  private boundEscKeyHandler = this.handleEscKey.bind(this);
  @state() private backdrop = false;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('backdrop')) {
      if (this.backdrop) {
        this.setAttribute('backdrop', '');
      } else {
        this.removeAttribute('backdrop');
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.boundEscKeyHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.boundEscKeyHandler);
    this.removeBackdrop();
  }

  /**
   * Creates a dialog and adds it to the container
   *
   * @returns {{ heading: string, content: HTMLElement, actionButtons: HTMLElement, hideCloseButton: boolean, closeLabel: string }} The dialog element
   */
  public createDialog(options: DialogOptions): HTMLElement {
    this.closeAllDialogs();
    const dialog = document.createElement('gup-dialog') as Dialog;
    dialog.setAttribute('heading', options.heading);
    if (options.hideCloseButton !== undefined) {
      dialog.setAttribute('hide-close-button', options.hideCloseButton.toString());
    }
    if (options.closeLabel) {
      dialog.setAttribute('close-label', options.closeLabel);
    }
    if (options.content) {
      dialog.innerHTML = options.content;
    }
    if (options.actionButtons) {
      const actionButtonsSlot = document.createElement('div');
      actionButtonsSlot.setAttribute('slot', 'action-buttons');
      actionButtonsSlot.innerHTML = options.actionButtons;
      dialog.appendChild(actionButtonsSlot);
    }

    this.activeDialogs.add(dialog);
    this.backdrop = true;
    this.setBackdrop();
    dialog.addEventListener('gup-close', () => this.closeDialog(dialog));
    this.appendChild(dialog);
    return dialog;
  }

  /** Closes a specific dialog, requires a dialog HTML element to be passed as an argument */
  public closeDialog(dialog: Dialog): void {
    if (this.activeDialogs.has(dialog)) {
      this.activeDialogs.delete(dialog);
      dialog.remove();
      this.backdrop = false;
      this.removeBackdrop();
    }
  }

  /** Closes all dialogs */
  public closeAllDialogs(): void {
    this.activeDialogs.forEach((dialog) => {
      dialog.remove();
    });
    this.activeDialogs.clear();
    this.backdrop = false;
    this.removeBackdrop();
  }

  private handleEscKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.activeDialogs.size > 0) {
      const lastDialog = Array.from(this.activeDialogs).pop() as Dialog;
      if (lastDialog) {
        this.closeDialog(lastDialog);
      }
    }
  }

  private setInert(): void {
    if (this.contentSelector) {
      const contentEl = document.querySelector(this.contentSelector);
      if (contentEl) {
        contentEl.setAttribute('inert', '');
      } else {
        this.previousElementSibling?.setAttribute('inert', '');
      }
    } else {
      this.previousElementSibling?.setAttribute('inert', '');
    }
  }

  private removeInert(): void {
    if (this.contentSelector) {
      const contentEl = document.querySelector(this.contentSelector);
      if (contentEl) {
        contentEl.removeAttribute('inert');
      } else {
        this.previousElementSibling?.removeAttribute('inert');
      }
    } else {
      this.previousElementSibling?.removeAttribute('inert');
    }
  }

  private setBackdrop(): void {
    document.body.style.overflow = 'hidden';
    this.setInert();
  }

  private removeBackdrop(): void {
    document.body.style.overflow = '';
    this.removeInert();
  }

  render() {
    return html`<slot></slot>`;
  }

  static readonly styles = unsafeCSS(styles);
}
