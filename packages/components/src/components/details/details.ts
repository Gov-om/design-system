import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import '../icon/icon';

/**
 * A disclosure element. Click on the button, and hidden content will be revealed. Do not stack.
 *
 * @slot - The content to be hidden/revealed
 * @slot label - The label. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive content like links or buttons
 *
 * @event gup-toggle - Emitted when the element toggles
 *
 * @dependency gup-icon
 */
@customElement('gup-details')
export class Details extends GupComponent {
  /** Whether the content is expanded by default */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Whether the content is styled as a quote or a timeline sink. Use a `gup-stepper` with `static-mode="true"` when `content-appearance="timeline"` */
  @property({ reflect: true, attribute: 'content-appearance' }) contentAppearance: 'quote' | 'sink' | 'none' = 'quote';

  /** The icon to use when the content is closed */
  @property({ attribute: 'closed-icon' }) closedIcon = 'keyboard-arrow-down';

  /** The icon to use when the content is open */
  @property({ attribute: 'open-icon' }) openIcon = 'keyboard-arrow-up';

  /** A tooltip appearing when hovering on the toggle button */
  @property({ attribute: 'toggle-button-title' }) toggleButtonTitle = '';

  /** Is icon hidden */
  @property({ type: Boolean, reflect: true, attribute: 'icon-hidden' }) iconHidden = false;

  /** Label of the tooltip for the close button */
  @property({ type: String, attribute: 'close-button-label' }) closeButtonLabel = 'Close';

  onToggle(event: Event) {
    const open = (event.target as HTMLDetailsElement)?.open;
    this.dispatchEvent(
      new CustomEvent('gup-toggle', {
        detail: open,
        bubbles: true,
        composed: true,
      })
    );
    this.open = open;
  }

  render() {
    const iconName = this.open ? this.openIcon : this.closedIcon;

    return html`
      <details class="inner" ?open=${this.open} @toggle=${this.onToggle}>
        <summary class="label" title=${this.toggleButtonTitle}>
          ${this.iconHidden ? nothing : html`<gup-icon icon-name="${iconName}" width="24" height="24"></gup-icon>`}
          <span class="label-inner"><slot name="label"></slot></span>
        </summary>
        <div class="content">
          <div class="content-inner">
            <slot></slot>
            ${
              this.contentAppearance === 'sink'
                ? html`
              <button aria-label="${this.closeButtonLabel}" title="${this.closeButtonLabel}" class="close-button" @click=${() => (this.open = false)}>
                <gup-icon icon-name="close" height="24" width="24"></gup-icon>
              </button>`
                : nothing
            }
          </div>
        </div>
      </details>
    `;
  }

  static readonly styles = css`
    :host {
      --gup-icon--fill-color: var(--gup-color-content-link);

      display: block;
      width: 100%;
      position: relative;
    }

    :host([content-appearance="quote"]) {
      max-width: 328px;
    }

    .label {
      cursor: pointer;
      color: var(--gup-color-content-link);
      display: flex;
      align-items: center;
      gap: var(--gup-component-3);

      &::marker {
        display: none;
      }
      &::-webkit-details-marker {
        display: none;
      }
    }

    .label-inner {
      text-decoration: underline;
      line-height: var(--line-height-500);

      &:hover {
        text-decoration-thickness: 2px;
      }
    }

    .content {
      margin-block-start: var(--gup-spacing-component-default);

      :host([content-appearance="quote"]) & {
        padding-block: var(--gup-padding-sm);
        padding-inline-start: var(--gup-padding-lg);
        border-inline-start: 6px solid var(--gup-color-brand-high);
        color: var(--gup-color-content-primary);
      }

      :host([content-appearance="sink"]) & {
        background-color: var(--gup-color-states-base-bg-secondary);
        padding: var(--gup-padding-md);
        width: 100%;
        border-bottom: 1px solid var(--gup-color-border-medium);
        margin-bottom: var(--gup-spacing-between-text);
      }
    }

    .content-inner {
      :host([content-appearance="sink"]) & {
        --gup-stepper-item--label--color: var(--gup-color-content-tertiary);
        --gup-stepper-item--selected--label--color: var(--gup-color-content-primary);

        position: relative;
        padding-inline-end: 24px;
      }
    }

    .close-button {
      position: absolute;
      inset-inline-end: 0;
      top: 0;
    }
`;
}
