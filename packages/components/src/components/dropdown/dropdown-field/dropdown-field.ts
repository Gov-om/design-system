import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './dropdown-field.css?inline';
import { DropdownMenuItem } from '../dropdown-menu-item/dropdown-menu-item';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import '../../input-field/input-field';
import '../../spinner/spinner';
import '../../track/track';
import { HasSlotController } from '../../../utils/slot-controller';
import { event, EventDispatcher } from '../../../utils/decorators/event';
import { InputField } from '../../input-field/input-field';
import { DropdownMenuItemData } from './dropdown-field.type';
import { FormControlMixin, requiredValidator } from '@open-wc/form-control';
import { innerInputValidators } from '../../../utils/form-validators';
import { ref } from 'lit/directives/ref.js';
import { classMap } from 'lit/directives/class-map.js';
import { Middleware, computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

/**
 * A form-based dropdown control. Note that some of the features of the dropdown can be controlled by the slotted `gup-dropdown-menu` or `gup-dropdown-menu-item` components.
 *
 * @slot - Insert a `gup-dropdown-menu` here
 * @slot label - Label content. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive content like links or buttons
 * @slot hint - Optional text that appears below the field if provided, used to guide the user about the input requirements or expected format
 *
 * @event gup-value-change - Emitted when the field value changes
 * @event gup-invalid - Emitted on error, contains validity state
 *
 * @cssprop --gup-dropdown-field--menu-width - The width of the dropdown menu
 * @cssprop --gup-dropdown-field--z-index - The z-index value for the dropdown menu
 *
 * @dependency gup-form-hint
 * @dependency gup-form-validation-message
 * @dependency gup-icon
 * @dependency gup-input-field
 * @dependency gup-screenreader-text
 * @dependency gup-spinner
 * @dependency gup-track
 */
@customElement('gup-dropdown-field')
export class DropdownField extends FormControlMixin(GupComponent) {
  static readonly formControlValidators = [...innerInputValidators, requiredValidator];

  /** Name of input element – gets submitted with the form data */
  @property() name = '';

  /** The placeholder of the input field */
  @property() placeholder = '';

  /** Is data loading. Set this to true manually in your application to display a loading indicator */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Is clear button displayed. Only relevant if gup-dropdown-menu with multiple attribute is used. The values can still be cleared by manually deselecting each item in the popup menu */
  @property({ type: Boolean, reflect: true }) clearable = false;

  /** If the input is required */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Is field disabled or not */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Translatable loading label. Only applicable if `loading="true"` */
  @property({ attribute: 'loading-label' }) loadingLabel = 'Loading...';

  /** Translatable clear button label. Only applicable if `clearable="true"` */
  @property({ attribute: 'clear-label' }) clearLabel = 'Clear';

  /** Translatable multiple selected values label. Only applicable if `multiple="true"`. Note the value includes an initial space */
  @property({ attribute: 'multiple-values-label' }) multipleValuesLabel = ' selected';

  /** If the input label is only accessible by ATs */
  @property({ type: Boolean, reflect: true, attribute: 'label-hidden' }) labelHidden = false;

  /** Display an error message and apply invalid input styles */
  @property({ attribute: 'error-message' }) errorMessage? = '';

  @query('gup-input-field') private inputField!: InputField;
  @query('.dropdown-menu') private popup!: HTMLElement;

  private inputValidationTarget!: HTMLInputElement;
  private readonly hasSlotController = new HasSlotController(this, 'hint');
  private popupAutoUpdateCleanup!: () => void;

  /** @internal */
  get validationTarget(): HTMLInputElement {
    return this.inputValidationTarget;
  }

  @queryAssignedElements({ selector: 'gup-dropdown-menu' })
  private dropdownMenuEls!: Array<DropdownMenu>;

  @state() private dropdownOpened: boolean = false;
  @state() private submitted = false;
  @state() private renderedValue: string = '';

  private boundHandleDocumentKeydown = this.handleDocumentKeydown.bind(this);
  private boundHandleDocumentClick = this.handleDocumentClick.bind(this);

  @event('gup-value-change') private onValueChange!: EventDispatcher<DropdownMenuItemData[] | null>;
  @event('gup-invalid') private onInvalid!: EventDispatcher<ValidityState>;

  private _value: string[] = [];

  /** Sets or gets the selected items. As a setter, accepts an array of string values, or a string (only when multiple is false). As a getter, always returns an array of values */
  @property({ type: Array })
  set value(val: string | string[] | null | undefined) {
    const value = val ? (Array.isArray(val) ? val : [val]) : [];
    this._value = value;

    const formData = this.getNativeFormValue(value);
    this.setValue(formData);
  }

  get value() {
    return this._value;
  }

  private getMiddleware(): Middleware[] {
    return [offset(4), flip({ padding: 5 }), shift({ padding: 5 })];
  }

  private setPopup() {
    if (this.inputField && this.popup) {
      this.popup.style.width = `${this.inputField.offsetWidth}px`;

      this.popupAutoUpdateCleanup = autoUpdate(this.inputField, this.popup, () => {
        computePosition(this.inputField, this.popup, {
          placement: 'bottom-start',
          middleware: this.getMiddleware(),
          strategy: 'absolute',
        }).then(({ x, y, placement }) => {
          Object.assign(this.popup.style, {
            left: `${x}px`,
            top: `${y}px`,
            position: 'absolute',
            zIndex: 'var(--gup-dropdown-field--z-index, 100)',
          });

          this.popup.setAttribute('data-placement', placement);
        });
      });
    }
  }

  async onInputClick(e: MouseEvent) {
    if ((this.inputField as InputField).focused && !(e.target as HTMLElement).closest('gup-dropdown-menu') && !this.loading) {
      this.toggleDropdown();
    }
  }

  private async toggleDropdown() {
    this.dropdownOpened = !this.dropdownOpened;
    if (this.popup) {
      this.popup.style.display = 'block';
      this.setPopup();
      document.addEventListener('click', this.boundHandleDocumentClick);

      if (this.dropdownOpened) {
        const dropdownMenu = await this.getDropdownMenu();
        if (dropdownMenu) {
          setTimeout(() => {
            dropdownMenu.setInitialFocus();
          }, 0);
        }
      }
    }
  }

  private closeDropdown() {
    this.dropdownOpened = false;
    if (this.popup) {
      this.popup.style.display = 'none';
      this.popupAutoUpdateCleanup?.();
      document.removeEventListener('click', this.boundHandleDocumentClick);
    }
  }

  private handleDocumentClick(e: MouseEvent) {
    if (this.dropdownOpened && !this.contains(e.target as Node) && !(e.target as Element).closest('gup-dropdown-menu')) {
      this.closeDropdown();
    }
  }

  async connectedCallback() {
    super.connectedCallback();

    document.addEventListener('keydown', this.boundHandleDocumentKeydown);

    this.internals.form?.addEventListener('submit', () => {
      this.submitted = true;
      this.reportValidity();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.boundHandleDocumentKeydown);
    document.removeEventListener('click', this.boundHandleDocumentClick);
    this.popupAutoUpdateCleanup?.();
  }

  firstUpdated() {
    this.setValue(this.getNativeFormValue());
    this.setupDropdownMenuAccessibility();
  }

  private async setupDropdownMenuAccessibility(): Promise<void> {
    const dropdownMenu = await this.getDropdownMenu();
    if (dropdownMenu) {
      const listboxId = `${this.name}-listbox`;
      dropdownMenu.listboxId = listboxId;
      this.updateDropdownMenuLabel(dropdownMenu);
    }
  }

  reportValidity() {
    this.requestUpdate();
    return this.checkValidity();
  }

  validityCallback(): string | void {
    this.onInvalid(this.internals.validity);
    return this.errorMessage || this.validationTarget?.validationMessage;
  }

  async forceCustomError() {
    await this.updateComplete;
    this.validationTarget.setCustomValidity(this.errorMessage || 'An error occurred');
    this.setValue(this.getNativeFormValue());
    this.reportValidity();
  }

  async clearCustomError() {
    await this.updateComplete;
    this.validationTarget.setCustomValidity('');
    this.setValue(this.getNativeFormValue());
    this.reportValidity();
  }

  // Set value programmatically
  private async setCurrentValue() {
    if (this._value) {
      this.renderedValue = '';

      const dropdownMenu = await this.getDropdownMenu();
      if (dropdownMenu) {
        const selectedItems = await this.setSelectedItemsByItsValue(this._value);
        if (selectedItems && selectedItems.length > 0) {
          dropdownMenu.selectedItems = selectedItems;
          if (dropdownMenu.multiple) {
            this.renderedValue = `${this._value.length} selected`;
          } else {
            this.renderedValue = selectedItems[0].label;
          }
        }
      }
    }
  }

  // Returns the value in a FormData object
  getNativeFormValue(value: string[] | null = null): FormData | null {
    const formData = new FormData();

    if (value) {
      value.forEach((file) => {
        formData.append(this.name, file);
      });
    }

    return formData.entries().next().done ? null : formData;
  }

  private renderErrorMessage() {
    return !this.checkValidity() && this.submitted
      ? html`
          <gup-form-validation-message slot="error-message" class="error-message" id="error-message">
            ${this.validationMessage}
          </gup-form-validation-message>`
      : nothing;
  }

  /** Sets currently selected items in the popup as the field's value */
  public async applyValue() {
    const dropdownMenu = await this.getDropdownMenu();
    if (dropdownMenu) {
      const selectedItems = await this.getSelectedDropdownItems();
      if (selectedItems && selectedItems.length > 0) {
        if (dropdownMenu.multiple) {
          const selectedItemsCount = selectedItems.length;
          if (selectedItemsCount === 0) {
            this.value = [];
            this.renderedValue = '';
          } else {
            this.renderedValue = `${selectedItemsCount}${this.multipleValuesLabel}`;
            this.value = [...selectedItems].map((item) => item.value);
          }
        } else {
          const selectedItem = selectedItems[0];
          if (selectedItem) {
            this.value = [selectedItem.value];
            this.renderedValue = selectedItem.label;
          } else {
            this.value = [];
            this.renderedValue = '';
          }
        }
        this.onValueChange(selectedItems);
      }
    }
    this.closeDropdown();
    // Move focus to next el
    this.updateComplete.then(() => this.inputField?.focus());
  }

  /** Clears current value */
  public async clearValue(): Promise<void> {
    this.value = [];
    this.renderedValue = '';
    const dropdownMenu = await this.getDropdownMenu();
    if (dropdownMenu) {
      dropdownMenu.clearSelection();
    }
    this.onValueChange([]);
  }

  private async handleInputKeydown(event: CustomEvent) {
    const nativeEvent = event.detail as KeyboardEvent;
    const key = nativeEvent.key;
    if ((key === ' ' || key === 'Enter') && !this.dropdownOpened && !this.loading) {
      nativeEvent.preventDefault();
      this.toggleDropdown();
    } else if (key === 'ArrowDown' && !this.dropdownOpened && !this.loading) {
      nativeEvent.preventDefault();
      this.toggleDropdown();
    } else if (key === 'ArrowUp' && !this.dropdownOpened && !this.loading) {
      nativeEvent.preventDefault();
      this.toggleDropdown();
    }
    // When dropdown is open, keyboard navigation is handled by the dropdown-menu because focus moves to the menu items via focusElement()
  }

  private handleDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.dropdownOpened) {
      this.closeDropdown();
      // Move focus to next el
      this.updateComplete.then(() => this.inputField?.focus());
    }
  }

  private async getDropdownMenu(): Promise<DropdownMenu | undefined> {
    await customElements.whenDefined('gup-dropdown-menu');
    return this.dropdownMenuEls[0] ?? undefined;
  }

  /** Checks if the dropdown is in multiple selection mode */
  public async isMultiple(): Promise<boolean> {
    const dropdownMenu = await this.getDropdownMenu();
    if (dropdownMenu) {
      return dropdownMenu.multiple;
    }

    return false;
  }

  /**
   * Gets currently selected items from `gup-dropdown-menu`
   *
   * @returns {Promise<{ value: string; label: string; selected: boolean; }[]>} - The selected dropdown items
   */
  public async getSelectedDropdownItems(): Promise<DropdownMenuItemData[] | undefined> {
    const dropdownMenu = await this.getDropdownMenu();
    if (dropdownMenu) {
      return dropdownMenu.getSelectedItems().map((item) => ({
        value: item.value,
        label: item.label,
        selected: item.selected,
      }));
    } else {
      throw new Error('Dropdown menu not found when getting selected items');
    }
  }

  private async setSelectedItemsByItsValue(itemValues: string[]): Promise<DropdownMenuItem[] | undefined> {
    const dropdownMenu = await this.getDropdownMenu();
    if (dropdownMenu) {
      dropdownMenu.clearSelection();
      const items = dropdownMenu.getItems();
      items.forEach((item) => {
        if (itemValues.includes(item.value)) {
          item.selected = true;
        }
      });
      return items.filter((item) => itemValues.includes(item.value));
    }
    return undefined;
  }

  private async handleInputFieldRef(el: InputField) {
    if (el) {
      await el.updateComplete;
      this.inputValidationTarget = el.validationTarget;
    }
  }

  private handleSlotChange(): void {
    this.setCurrentValue();
    const dropdownMenu = this.dropdownMenuEls[0];
    if (dropdownMenu) {
      const listboxId = `${this.name}-listbox`;
      dropdownMenu.listboxId = listboxId;

      this.updateDropdownMenuLabel(dropdownMenu);
    }
  }

  private updateDropdownMenuLabel(dropdownMenu: DropdownMenu): void {
    const labelSlot = this.querySelector('[slot="label"]');
    if (labelSlot) {
      const labelText = labelSlot.textContent?.trim();
      if (labelText) {
        dropdownMenu.ariaLabel = labelText;
      }
    }
  }

  private handlePopupApply(): void {
    this.applyValue();
  }

  private renderLoadingSpinner() {
    return html`
      <gup-track horizontal-alignment="center" vertical-alignment="center" class="spinner-wrapper" slot="input-end">
        <gup-spinner label-hidden label=${this.loadingLabel}></gup-spinner>
      </gup-track>
    `;
  }

  private renderEndSlot() {
    return html`
      <gup-track slot="input-end" horizontal-alignment="right">
        ${
          this._value.length > 0 && this.clearable
            ? html`
          <button @click=${this.clearValue} aria-label="${this.clearLabel}" title="${this.clearLabel}">
            <gup-icon icon-name="close" height="24" width="24"></gup-icon>
          </button>`
            : nothing
        }
        <gup-icon icon-name="keyboard-arrow-down" height="24" width="24"></gup-icon>
      </gup-track>`;
  }

  render() {
    return html`
      <div class="${classMap({
        'host-inner': true,
        'has-hint': this.hasSlotController.test('hint'),
      })}">
        <gup-input-field
          .value="${this.renderedValue}"
          id="${this.name}"
          @click=${(e: MouseEvent) => this.onInputClick(e)}
          @gup-keydown=${this.handleInputKeydown}
          name="${this.name}"
          ?label-hidden="${this.labelHidden}"
          placeholder="${this.loading ? this.loadingLabel : this.placeholder}"
          readonly
          type="text"
          input-role="combobox"
          aria-haspopup="listbox"
          aria-controls="${this.name}-listbox"
          .ariaExpandedState="${this.dropdownOpened}"
          class="${classMap({
            'input-field': true,
            'required': this.required,
            'invalid': !this.checkValidity() && this.submitted,
          })}"
          ?disabled=${this.disabled}
          ?required="${this.required}"
          ${ref((el) => this.handleInputFieldRef(el as InputField))}
        >
          <slot name="label" class="label"></slot>
          <span slot="hint" class="hint"><slot name="hint"></slot></span>
          ${this.renderErrorMessage()}
          ${this.loading ? this.renderLoadingSpinner() : this.renderEndSlot()}
          <div slot="popup" class="dropdown-menu">
            <slot @slotchange=${this.handleSlotChange} @gup-apply=${this.handlePopupApply}></slot>
          </div>
        </gup-input-field>
      </div>
    `;
  }
  static readonly styles = unsafeCSS(styles);
}
