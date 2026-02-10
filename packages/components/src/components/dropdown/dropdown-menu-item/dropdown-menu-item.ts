import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './dropdown-menu-item.css?inline';
import '../../icon/icon';
import { ref, createRef } from 'lit/directives/ref.js';
import type { Ref } from 'lit/directives/ref.js';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import '../../checkbox/checkbox';
import { type Checkbox } from '../../checkbox/checkbox';
/**
 * A dropdown menu item
 *
 * @slot - Custom HTML to render in the item. If not provided, the `label` property will be used. Note that HTML must have a single wrapper element. Avoid inserting interactive elements such as buttons or links in the slot.
 *
 * @dependency gup-icon
 * @dependency gup-checkbox
 */
@customElement('gup-dropdown-menu-item')
export class DropdownMenuItem extends GupComponent {
  /** The label. If no slot content is provided, this will be used */
  @property({ reflect: true }) label = '';

  /** The id-like value associated with the dropdown item */
  @property({ reflect: true }) value = '';

  /**
   * The id-like value associated with the dropdown item. Deprecated in favour of `value`
   *
   * @deprecated since version 3.0.0. Use `value` instead
   */
  @property({ reflect: true }) id = '';

  /** Whether the dropdown menu item is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the dropdown menu item is selected */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Whether the dropdown menu item is visible. Not to be used directly */
  @property({ type: Boolean, reflect: true }) visible = true;

  private buttonRef: Ref<HTMLButtonElement> = createRef();
  private checkboxRef: Ref<Checkbox> = createRef();

  /** Focuses the dropdown menu item */
  public focusElement() {
    const target = this.isDropdownMenuMultiple() ? this.checkboxRef.value : this.buttonRef.value;
    target?.focus();
  }

  // TODO: this might be prone to an incorrect detection of the parent components property value if that component is not defined yet
  private isDropdownMenuMultiple(): boolean {
    return this.closest<DropdownMenu>('gup-dropdown-menu')?.multiple ?? false;
  }

  private onClick(event: MouseEvent) {
    if (this.isDropdownMenuMultiple()) {
      // This stops the checkbox change event from bubbling up to `gup-dropdown-menu`. The latter uses the same event name as `gup-checkbox`, so subscribing to `gup-change` `gup-dropdown-menu` with `multiple=true` triggers both events)
      event.stopPropagation();
    }

    if (!this.disabled) {
      this.selected = !this.selected;
      // We do not want this internal event to appear in the Storybook as a part of component documentation
      /** @internal */
      this.dispatchEvent(
        new CustomEvent('dropdown-menu-item-click', {
          bubbles: true,
          composed: true,
          detail: { element: this },
        })
      );
    }
  }

  render() {
    if (this.isDropdownMenuMultiple()) {
      return html`
        <div role="option" aria-selected="${this.selected}">
          <gup-checkbox class="checkbox"
                        size="s"
                        ?disabled=${this.disabled}
                        ?checked=${this.selected}
                        @gup-change="${this.onClick}"
                        value="${this.value}"
                        tabindex="-1"
                        ${ref(this.checkboxRef)}
          >
            <div class="content">
              <slot>${this.label}</slot>
            </div>
          </gup-checkbox>
        </div>
         `;
    } else {
      return html`
        <button class="button"
                role="option"
                aria-selected="${this.selected}"
                @click="${this.onClick}"
                ?disabled=${this.disabled}
                tabindex="-1"
                ${ref(this.buttonRef)}>
          <div class="inner">
            <div class="content">
              <slot>${this.label}</slot>
            </div>
            <div class="check-icon-wrapper">
                ${this.selected ? html`<gup-icon height="20" width="20" icon-name="check"></gup-icon>` : ''}
            </div>
          </div>
        </button>
      `;
    }
  }

  static readonly styles = unsafeCSS(styles);
}
