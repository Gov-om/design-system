import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './toast-container.css?inline';
import { ToastSeverity } from '../toast/toast';
import '../../track/track';
import '../toast/toast';
import { GupComponent } from '../../../styles/styles';

/**
 * A container for toasts. Add this component to `body` tag and insert toasts into it using `addToast()` method
 *
 * @slot - Main slot. Only intended for `gup-toast` elements
 *
 * @cssprop --gup-toast-container--z-index - The z-index value for the toast container
 *
 * @dependency gup-toast
 * @dependency gup-track
 */
@customElement('gup-toast-container')
export class ToastContainer extends GupComponent {
  /** Inserts a toast inside of the container */
  public addToast(message: string, severity: ToastSeverity = 'neutral', delay: number, closeLabel: string = 'Close'): void {
    const toast = document.createElement('gup-toast');
    toast.textContent = message;
    toast.setAttribute('severity', severity);
    toast.setAttribute('close-label', closeLabel);
    setTimeout(() => toast.remove(), delay);
    this.appendChild(toast);
  }

  render() {
    return html`
      <gup-track gap="3" direction="vertical" aria-live="polite">
        <slot></slot>
      </gup-track>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
