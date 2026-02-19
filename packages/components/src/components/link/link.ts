import { html, nothing, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './link.css?inline';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A link that looks great on the web. Can behave as a link or a button depending on your desiderata.
 *
 * @slot - The label of a link
 *
 * @event gup-click - Emitted when the link is clicked. Only relevant if `kind=button`
 */
@customElement('gup-link')
export class Link extends GupComponent {
  /** If the link behaves as an HTML button or an anchor */
  @property() kind: 'button' | 'link' = 'link';

  /** The size of the link */
  @property() size: 's' | 'm' | 'l' = 'm';

  /** The visual severity of the link */
  @property() severity: 'primary' | 'secondary' | 'danger' = 'primary';

  /** If the link is disabled. Only relevant if `kind=button` */
  @property({ type: Boolean }) disabled = false;

  /** Whether will open the URL in a new tab. Only applicable if kind="link" */
  @property({ type: Boolean, reflect: true, attribute: 'open-in-new-tab' }) openInNewTab = false;

  /** Only relevant if `kind=link` */
  @property() href = '';

  onClick(clickEvent: Event) {
    this.dispatchEvent(new CustomEvent('gup-click', clickEvent));
  }

  render() {
    const classes = {
      'link': true,
      [`link--severity-${this.severity}`]: true,
      [`link--size-${this.size}`]: true,
      'link--is-disabled': this.disabled && this.kind === 'button',
    };

    return html`
      ${
        this.kind === 'button'
          ? html`
            <button class="${classMap(classes)}" ?disabled="${this.disabled}" @click=${this.onClick}>
              <slot></slot>
            </button>`
          : html`
            <a target="${this.openInNewTab ? '_blank' : nothing}" href="${this.href}" class="${classMap(classes)}">
              <slot></slot>
            </a>`
      }
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
