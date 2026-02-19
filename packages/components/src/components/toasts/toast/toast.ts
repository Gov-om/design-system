import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './toast.css?inline';
import { GupIconName } from '@govom/icons/dist/index.d';
import '../../icon/icon';
import { event, EventDispatcher } from '../../../utils/decorators/event';

/**
 * A toast component. Use this component to display a short message to the user. Use a `gup-toast-container` and its public method `addToast()` to insert toasts into DOM
 *
 * @slot - A slot for content. Technically, you can put anything inside the toast, however `addToast()` method of `gup-toast-container` only accepts strings right now
 *
 * @event gup-remove - Fires when the toast is removed from DOM
 *
 * @dependency gup-icon
 */
@customElement('gup-toast')
export class Toast extends GupComponent {
  /** Visual appearance aka severity */
  @property({ reflect: true }) severity: ToastSeverity = 'neutral';

  /** Translatable clear button label. Shows up in screenreaders and as a browser tooltip */
  @property({ attribute: 'close-label' }) closeLabel = 'Close';

  @event('gup-remove') private onRemove!: EventDispatcher<Toast>;

  /** Removes the toast from DOM */
  public removeToast(): void {
    this.onRemove(this);
    this.remove();
  }

  render() {
    let iconName: GupIconName;

    if (this.severity === 'positive') {
      iconName = 'done';
    } else if (this.severity === 'negative') {
      iconName = 'close';
    } else if (this.severity === 'warning') {
      iconName = 'priority-high';
    } else {
      iconName = 'priority-high';
    }
    const iconSize = 12;

    return html`
      <div class="inner">
        <div class="icon-wrapper">
          <gup-icon class="icon" icon-name="${iconName}" width="${iconSize}" height="${iconSize}"></gup-icon>
        </div>
        <div class="content" role="alert">
          <slot></slot>
        </div>
        <button class="close-button" aria-label="${this.closeLabel}" title="${this.closeLabel}" @click="${() => this.removeToast()}">
          <gup-icon class="close-button-icon" icon-name="close" width="22" height="22"></gup-icon>
        </button>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}

export type ToastSeverity = 'neutral' | 'positive' | 'negative' | 'warning';
