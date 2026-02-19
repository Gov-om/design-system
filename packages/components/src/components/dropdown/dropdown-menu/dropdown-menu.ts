import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import { event, EventDispatcher } from '../../../utils/decorators/event';
import { watch } from '../../../utils/decorators/watch';
import styles from './dropdown-menu.css?inline';
import '../../icon/icon';
import '../../track/track';
import '../../button/button';
import { DropdownMenuItem } from '../dropdown-menu-item/dropdown-menu-item';
import { DeprecatedDropdownMenuItemData, DropdownMenuItemData } from '../dropdown-field/dropdown-field.type';

/**
 * A dropdown menu. To be opened from within `gup-dropdown-field` or a similar component.
 *
 * @slot - Only `gup-dropdown-menu-item` elements
 * @slot controls-extra-buttons - Extra buttons for the controls slot. Allows to retain the default "Apply" button while adding custom buttons
 * @slot controls - The content of the dropdown menu footer area. Allows to fully customise the controls, including getting rid of the default Apply button. You should use up to two buttons here nested in a `gup-track` with `horizontal-alignment="right"`. For example, "Clear" (use a `gup-button` with `appearance=text`) and "Done" (use a `gup-button` with `appearance=primary`). Note that the label of the primary button should change to "Apply" when an item is selected.
 *
 * @event gup-change - Fires whenever user selects items. Note that this event might not be very useful on its own because selecting an item does not necessarily mean that the user is done with the selection
 * @event gup-search-input - Emitted when the search input value changes
 * @event gup-apply - Emitted when the user clicks the primary action button (unless the `controls` slot is overridden)
 *
 * @cssprop --gup-dropdown-menu--max-height - The max height of the dropdown menu
 *
 * @dependency gup-icon
 * @dependency gup-button
 * @dependency gup-track
 */
@customElement('gup-dropdown-menu')
export class DropdownMenu extends GupComponent {
  /** If set to true, a search input will be displayed inside of the menu popup */
  @property({ type: Boolean, attribute: 'search-enabled' }) searchEnabled = false;

  /** Displayed if no dropdown items are loaded */
  @property({ attribute: 'no-items-label' }) noItemsLabel = 'No items';

  /** Displayed if no search results available. Only relevant if `search-enabled` is set to true */
  @property({ attribute: 'search-no-results-label' }) searchNoResultsLabel = 'No results for';

  /** Displayed as a label of the primary action button when a selection has been done. Only relevant if the `controls` slot is not overridden */
  @property({ attribute: 'items-selected-button-label' }) itemsSelectedButtonLabel = 'Apply';

  /** Displayed as a label of the primary action button when the selection is empty. Only relevant if the `controls` slot is not overridden */
  @property({ attribute: 'no-selection-button-label' }) noSelectionButtonLabel = 'Done';

  /** Placeholder for the search input. Only relevant if `search-enabled` is set to true */
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'Search...';

  /** Whether multiple items can be selected at once in the dropdown menu */
  @property({ type: Boolean }) multiple = false;

  /** The accessible label for the listbox. Used for screen readers */
  @property({ attribute: 'aria-label' }) override ariaLabel = 'Options';

  /** The id for the listbox element. Used for aria-controls reference */
  @property({ attribute: 'listbox-id' }) listboxId = '';

  @event('gup-change') private onChange!: EventDispatcher<DropdownMenuItemData[] | null>;
  @event('gup-search-input') private onSearchInput!: EventDispatcher<string>;
  @event('gup-apply') private onApply!: EventDispatcher<void>;
  @event('gup-activedescendant-change') private onActiveDescendantChange!: EventDispatcher<string>;

  @state() private searchValue = '';
  @state() private filteredItems: DropdownMenuItem[] = [];
  @state() private _selectedItems: DropdownMenuItemData[] = [];
  @state() private highlightedIndex = 0;
  @state() private isEmpty = false;

  firstUpdated() {
    this.addEventListener('dropdown-menu-item-click', this.dropdownMenuItemClick as EventListener);
    this.addEventListener('keydown', this.handleKeyDown as EventListener);
  }

  @watch('_selectedItems')
  async handleSelectedItemsChange(): Promise<void> {
    this.filteredItems.forEach((item) => {
      const value = this.pickValue(item);
      item.selected = this._selectedItems.some((selectedItem) => selectedItem.value === value);
    });

    // this.requestUpdate();
  }

  @watch('filteredItems')
  async handleFilteredItemsChange(): Promise<void> {
    this.isEmpty = !this.filteredItems.some((item) => item.visible === true);
  }

  /**
   * Sets or gets selected items
   *
   * @param {{ value: string; label: string; selected: boolean; }[]} items - Array of selected items to accept (when setter) or return (when getter). When used as a setter, each item should have a `value` property, if not present, an `id` will be used (deprecated, subject to be removed!) or `label`
   */
  public set selectedItems(items: DeprecatedDropdownMenuItemData[]) {
    // could be set to a string
    if (Array.isArray(items)) {
      this._selectedItems = items.map((item) => ({
        value: this.pickValue(item),
        label: item.label,
        selected: item.selected,
      }));
    }
  }

  public get selectedItems(): DropdownMenuItemData[] {
    return this._selectedItems;
  }

  /** Returns all items (with search taken into account) as `gup-dropdown-menu-item` elements */
  public getItems(): DropdownMenuItem[] {
    return this.filteredItems;
  }

  /**
   * Gets currently selected items
   *
   * @returns {{ value: string; label: string; selected: boolean; }[]} - The selected dropdown items
   */
  public getSelectedItems(): DropdownMenuItemData[] {
    return this._selectedItems.map((item) => ({
      value: item.value,
      label: item.label,
      selected: item.selected,
    }));
  }

  private pickValue(item: DeprecatedDropdownMenuItemData): string {
    return item.value || item.id || item.label;
  }

  private dropdownMenuItemClick(evt: CustomEvent<{ element: DropdownMenuItem }>) {
    const clickedItem = evt.detail.element;
    this.selectItem(clickedItem);
  }

  /** Selects or deselects an item */
  public selectItem(clickedItem: DropdownMenuItem): void {
    if (this.multiple) {
      const itemIndex = this._selectedItems.findIndex((item: DropdownMenuItemData) => {
        const value = this.pickValue(clickedItem);
        return item.value === value;
      });
      if (itemIndex > -1) {
        this._selectedItems[itemIndex].selected = false;
        this._selectedItems.splice(itemIndex, 1);
      } else {
        this._selectedItems.push({
          value: this.pickValue(clickedItem),
          label: clickedItem.label,
          selected: true,
        } as DropdownMenuItemData);
      }
    } else {
      this._selectedItems = [
        {
          value: this.pickValue(clickedItem),
          label: clickedItem.label,
          selected: true,
        } as DropdownMenuItemData,
      ];
    }
    this.onChange(this._selectedItems);
    this.requestUpdate();
  }

  /** Clears currently selected items */
  public clearSelection(): void {
    this.filteredItems.forEach((item) => {
      item.selected = false;
    });
    this._selectedItems = [];
    this.onChange(this._selectedItems);
  }

  public setInitialFocus(): void {
    const visibleItems = this.filteredItems.filter((item) => item.visible && !item.disabled);
    if (visibleItems.length === 0) return;
    const selectedItem = visibleItems.find((item) => item.selected);
    const itemToFocus = selectedItem || visibleItems[0];

    this.updateHighlightedItem(itemToFocus);
  }

  private handleSearchInput(event: InputEvent): void {
    event.stopPropagation();
    this.searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.updateItemsVisibility(this.searchValue);
    this.onSearchInput(this.searchValue);
  }

  private updateItemsVisibility(searchQuery = ''): void {
    if (searchQuery.length === 0) {
      const filteredItems: DropdownMenuItem[] = this.filteredItems;
      filteredItems.forEach((item) => {
        item.visible = true;
      });
      this.filteredItems = [...filteredItems];
    } else {
      // We need to reassign the filteredItems to trigger a Lit reactive update. Also we need to use forEach here instead of map because otherwise the array will lose a reference to an original HTML element
      const filteredItems: DropdownMenuItem[] = this.filteredItems;
      filteredItems.forEach((item) => {
        item.visible = item.label.toLowerCase().includes(searchQuery);
      });
      this.filteredItems = [...filteredItems];
    }
  }

  private handleApply(): void {
    this.onApply();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const visibleItems = this.filteredItems.filter((item) => item.visible && !item.disabled);
    const itemsCount = visibleItems.length;

    if (itemsCount === 0) return;

    const pressedElement = event.target as HTMLElement;
    const isOnMenuItem =
      pressedElement && (pressedElement.tagName.toLowerCase() === 'gup-dropdown-menu-item' || pressedElement.closest('gup-dropdown-menu-item'));

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateToNextItem(visibleItems);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateToPrevItem(visibleItems);
        break;
      case 'Enter':
      case ' ':
        if (isOnMenuItem && this.highlightedIndex !== -1) {
          event.preventDefault();
          this.selectHighlightedItem();
        }
        break;
    }
  }

  public navigateNext(): void {
    const visibleItems = this.filteredItems.filter((item) => item.visible && !item.disabled);
    if (visibleItems.length > 0) {
      this.navigateToNextItem(visibleItems);
    }
  }

  public navigatePrevious(): void {
    const visibleItems = this.filteredItems.filter((item) => item.visible && !item.disabled);
    if (visibleItems.length > 0) {
      this.navigateToPrevItem(visibleItems);
    }
  }

  public selectHighlighted(): void {
    this.selectHighlightedItem();
  }

  private navigateToNextItem(visibleItems: DropdownMenuItem[]): void {
    const currentIndex = visibleItems.findIndex((item) => item === this.filteredItems[this.highlightedIndex]);
    const nextIndex = (currentIndex + 1) % visibleItems.length;
    this.updateHighlightedItem(visibleItems[nextIndex]);
  }

  private navigateToPrevItem(visibleItems: DropdownMenuItem[]): void {
    const currentIndex = visibleItems.findIndex((item) => item === this.filteredItems[this.highlightedIndex]);
    const prevIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    this.updateHighlightedItem(visibleItems[prevIndex]);
  }

  private updateHighlightedItem(item: DropdownMenuItem): void {
    const previousItem = this.filteredItems[this.highlightedIndex];
    if (previousItem) {
      previousItem.removeAttribute('data-highlighted');
    }

    this.highlightedIndex = this.filteredItems.findIndex((filteredItem) => filteredItem === item);

    if (item) {
      item.setAttribute('data-highlighted', 'true');
      let optionId = item.getAttribute('id');
      if (!optionId) {
        optionId = `option-${this.highlightedIndex}`;
        item.setAttribute('id', optionId);
      }
      this.onActiveDescendantChange(optionId);
      item.focusElement();
      item.scrollIntoView({ block: 'nearest' });
    }
  }

  private selectHighlightedItem(): void {
    const selectedItem = this.filteredItems[this.highlightedIndex];
    if (selectedItem) {
      selectedItem.selected = !selectedItem.selected;

      this.dropdownMenuItemClick(new CustomEvent('dropdown-menu-item-click', { detail: { element: selectedItem } }));
    }
  }

  private async handleSlotChange(e: Event): Promise<void> {
    const elements = ((e.target as HTMLSlotElement | null)?.assignedElements() ?? []) as DropdownMenuItem[];
    this.isEmpty = elements.length === 0;
    // We need to wait for the elements to be defined. Before that their properties will be reported as undefined
    await Promise.all([customElements.whenDefined('gup-dropdown-menu-item')]).then(() => {
      this.filteredItems = [...elements];
    });
  }

  render() {
    return html`
      <div class="inner">
        ${
          this.searchEnabled
            ? html`
              <div class="search-container">
                <gup-icon class="search-icon" icon-name="search" width="24" height="24"></gup-icon>
                <input
                  class="search"
                  type="text"
                  placeholder="${this.searchPlaceholder}"
                  @input=${this.handleSearchInput}
                />
              </div>
            `
            : ''
        }
        <div class="dropdown-items" role="listbox" aria-label="${this.ariaLabel}" tabindex="0" id="${this.listboxId}">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${
          this.isEmpty
            ? html`
              <div class="no-results" aria-live="polite">
                <span class="no-result-label">
                  ${
                    this.searchValue
                      ? html`
                    ${this.searchNoResultsLabel}
                    <span class="search-term">${this.searchValue}</span>
                  `
                      : this.noItemsLabel
                  }
                </span>
              </div>
            `
            : nothing
        }
        <div class="controls">
          <slot name="controls">
            <gup-track class="controls-track" horizontal-alignment="right">
              <slot name="controls-extra-buttons"></slot>
              <gup-button appearance=${this._selectedItems.length > 0 ? 'primary' : 'text'} class="apply-button" @gup-click=${this.handleApply}>${this._selectedItems.length > 0 ? html`${this.itemsSelectedButtonLabel} ${this.multiple ? '(' + this._selectedItems.length + ')' : nothing}` : this.noSelectionButtonLabel}</gup-button>
            </gup-track>
          </slot>
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
