import { html, nothing, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './button.css?inline';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * A button that looks great on even a most demanding gentleman's jacket. Can behave as a button or a link depending on your desiderata.
 *
 * @cssprop --gup-button--underline - The underline of the button (equivalent to `text-decoration` CSS property). Only relevant if `appearance="text"`. Use it to cancel out the default underline
 *
 * @event gup-click - Emitted when the button is clicked. Only relevant if `kind=button`
 *
 * @slot - The label of a button
 * @slot icon-start - The icon to be displayed at the start of the button
 * @slot icon-end - The icon to be displayed at the end of the button
 */
@customElement('gup-button')
export class Button extends GupComponent {
  /** The role of the component should be chosen between link or button */
  @property({ reflect: true }) kind: 'button' | 'link' = 'button';

  /** The type of the button. Only applicable if kind="button" */
  @property({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  /** Whether the button should display only the icon with no text */
  @property({ type: Boolean, reflect: true, attribute: 'with-icon-only' }) withIconOnly = false;

  /** The appearance of the button */
  @property({ reflect: true }) appearance: 'primary' | 'secondary' | 'text' | 'danger' = 'primary';

  /** Whether the button is inverted */
  @property({ type: Boolean, reflect: true }) inverted = false;

  /** The label of the button. Used if 'with-icon-only'="true" */
  @property() label? = '';

  /** Whether the button is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Only relevant if kind=link */
  @property() href = '';

  /** Whether will open the URL in a new tab. Only applicable if kind="link" */
  @property({ type: Boolean, reflect: true, attribute: 'open-in-new-tab' }) openInNewTab = false;

  /** @internal */
  @query('.button')
  buttonElement!: HTMLElement;

  onClick(clickEvent: Event) {
    this.dispatchEvent(new CustomEvent('gup-click', clickEvent));
  }

  /** Focuses the button */
  public async focus(): Promise<void> {
    this.buttonElement.focus();
  }

  render() {
    return html`
      ${
        this.kind === 'button'
          ? html`
          <button class="button" ?disabled="${this.disabled}" @click=${this.onClick} type="${this.type}" title="${ifDefined(this.withIconOnly ? this.label : undefined)}">
            <slot name="icon-start"></slot>
            <slot></slot>
            ${this.label ? html`<span class="label">${this.label}</span> ` : ''}
            <slot name="icon-end"></slot>
          </button>`
          : html`
          <a href="${this.href}" class="button" target="${this.openInNewTab ? '_blank' : nothing}" title="${ifDefined(this.withIconOnly ? this.label : undefined)}">
            <slot name="icon-start"></slot>
            <slot></slot>
            <slot name="icon-end"></slot>
          </a>
        `
      }
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
