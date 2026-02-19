import { html, unsafeCSS, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import { event, EventDispatcher } from '../../utils/decorators/event';
import styles from './data-table.css?inline';
import { Table } from '../table/table/table';
import '../table/table-row/table-row';
import '../table/table-cell/table-cell';
import '../input-field/input-field';
import '../button/button';
import '../icon/icon';
import '../pagination/pagination';
import '../filter-chip/filter-chip/filter-chip';
import '../badge-chip/badge-chip';
import '../details/details';

export interface DataTableColumn {
  /** Unique key for the column */
  key: string;
  /** Header label for the column */
  label: string;
  /** Width of the column (e.g., '180px', '20%') */
  width?: string;
  /** Whether the column can grow to fill available space */
  grow?: boolean;
}

export interface DataTableFilter {
  /** Unique key for the filter */
  key: string;
  /** Label displayed on the filter button */
  label: string;
  /** Type of the filter field (e.g., 'text', 'date', 'select') */
  type?: 'text' | 'date' | 'select';
  /** Options for the filter */
  options?: { value: string; label: string }[];
}

export interface AppliedFilter {
  /** Key of the filter */
  key: string;
  /** Value of the applied filter */
  value: string;
  /** Display label for the filter chip */
  label: string;
}

/**
 * A data table component with search, filtering, and pagination support.
 * Supports both desktop (horizontal table) and mobile (stacked cards) layouts.
 *
 * @slot - Table rows using `gup-table-row` and `gup-table-cell` components
 * @slot filters - Custom filter content
 * @slot pagination - Custom pagination content
 *
 * @event gup-search - Dispatched when search value changes
 * @event gup-filter-change - Dispatched when filters are applied or removed
 * @event gup-page-change - Dispatched when page changes
 * @event gup-clear-filters - Dispatched when all filters are cleared
 *
 * @dependency gup-table
 * @dependency gup-table-row
 * @dependency gup-table-cell
 * @dependency gup-input-field
 * @dependency gup-button
 * @dependency gup-icon
 * @dependency gup-pagination
 * @dependency gup-filter-chip
 * @dependency gup-badge-chip
 * @dependency gup-details
 */
@customElement('gup-data-table')
export class DataTable extends GupComponent {
  /** Title of the data table */
  @property() title = '';

  /** Description text below the title */
  @property() description = '';

  /** Search placeholder text */
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'Find data';

  /** Current search value */
  @property({ attribute: 'search-value' }) searchValue = '';

  /** Number of results found (for display) */
  @property({ type: Number, attribute: 'results-count' }) resultsCount?: number;

  /** Total number of items */
  @property({ type: Number, attribute: 'total-items' }) totalItems = 0;

  /** Current page number */
  @property({ type: Number, attribute: 'current-page' }) currentPage = 1;

  /** Number of items per page */
  @property({ type: Number, attribute: 'items-per-page' }) itemsPerPage = 10;

  /** Layout type - 'table' for desktop, 'stacked' for mobile */
  @property({ reflect: true }) layout: 'table' | 'stacked' = 'table';

  /** Whether to show search field */
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = true;

  /** Whether to show filters */
  @property({ type: Boolean, attribute: 'show-filters' }) showFilters = false;

  /** Filter button labels (JSON array) */
  @property({ type: Array }) filters: DataTableFilter[] = [];

  /** Applied filters (JSON array) */
  @property({ type: Array, attribute: 'applied-filters' }) appliedFilters: AppliedFilter[] = [];

  /** Column definitions (JSON array) */
  @property({ type: Array }) columns: DataTableColumn[] = [];

  /** Text for the filters button in mobile layout */
  @property({ attribute: 'filters-button-text' }) filtersButtonText = 'Filters';

  /** Text for the clear all button */
  @property({ attribute: 'clear-all-text' }) clearAllText = 'Clear all';

  /** Text for the view application button */
  @property({ attribute: 'view-button-text' }) viewButtonText = 'View application';

  /** Icon name for the view application button (e.g., 'download') */
  @property({ attribute: 'view-button-icon' }) viewButtonIcon = '';

  /** Whether to show the view application button */
  @property({ type: Boolean, attribute: 'show-view-button' }) showViewButton = true;

  /** Mobile action buttons (array of button labels) */
  @property({ type: Array, attribute: 'mobile-action-buttons' }) mobileActionButtons: string[] = [];

  /** Empty state title - shown when totalItems is 0 */
  @property({ attribute: 'empty-title' }) emptyTitle = 'No applications found';

  /** Empty state description - shown when totalItems is 0 */
  @property({ attribute: 'empty-description' }) emptyDescription = 'There are no applications to display. Create your first application to get started.';

  /** Whether the filter panel is open (desktop) */
  @property({ type: Boolean, attribute: 'filter-panel-open', reflect: true }) filterPanelOpen = false;

  /** Reference to the internal gup-table element */
  @query('gup-table') private _tableElement!: Table;

  /** Stores the original total items count before filtering */
  private _originalTotalItems: number | null = null;

  @event('gup-search') private onSearchEvent!: EventDispatcher<string>;
  @event('gup-page-change') private onPageChange!: EventDispatcher<number>;
  @event('gup-clear-filters') private onClearFilters!: EventDispatcher<void>;
  @event('gup-view-click') private onViewClick!: EventDispatcher<void>;
  @event('gup-filter-apply') private onFilterApply!: EventDispatcher<AppliedFilter[]>;

  override firstUpdated() {
    this._forwardSlottedContent();
    this._paginateRows();
  }

  override updated() {
    this._forwardSlottedContent();
    this._paginateRows();
  }

  /**
   * Forward slotted content to the internal gup-table element.
   * gup-table uses querySelectorAll on its own light DOM, so we need to
   * move the content from data-table's light DOM into gup-table's light DOM.
   */
  private _forwardSlottedContent() {
    if (!this._tableElement) return;

    // Get all header cells and rows from data-table's light DOM
    const headerCells = this.querySelectorAll(':scope > gup-table-cell[type="header"]');
    const tableRows = this.querySelectorAll(':scope > gup-table-row');

    // Move them into gup-table's light DOM if they're not already there
    headerCells.forEach((cell) => {
      if (cell.parentElement !== this._tableElement) {
        this._tableElement.appendChild(cell);
      }
    });

    tableRows.forEach((row) => {
      if (row.parentElement !== this._tableElement) {
        this._tableElement.appendChild(row);
      }
    });

    // Trigger gup-table to re-assign slots
    this._tableElement.updateSlots();
  }

  private _handleSearchInput(e: CustomEvent) {
    this.searchValue = e.detail;
    this._filterRows();
    this.onSearchEvent(this.searchValue);
  }

  private _filterRows() {
    const searchTerm = this.searchValue.toLowerCase().trim();
    const rows = this._tableElement?.querySelectorAll('gup-table-row') ?? this.querySelectorAll('gup-table-row');

    // Store original total items count before first filter
    if (this._originalTotalItems === null) {
      this._originalTotalItems = this.totalItems;
    }

    let visibleCount = 0;

    rows.forEach((row) => {
      const htmlRow = row as HTMLElement;

      if (!searchTerm) {
        delete htmlRow.dataset.filteredOut;
        visibleCount++;
      } else {
        const cells = row.querySelectorAll('gup-table-cell');
        let matchFound = false;

        cells.forEach((cell) => {
          const textContent = cell.textContent?.toLowerCase() ?? '';
          if (textContent.includes(searchTerm)) {
            matchFound = true;
          }
        });

        if (matchFound) {
          delete htmlRow.dataset.filteredOut;
          visibleCount++;
        } else {
          htmlRow.dataset.filteredOut = 'true';
          htmlRow.style.display = 'none';
        }
      }
    });

    this.resultsCount = visibleCount;

    if (!searchTerm) {
      this.totalItems = this._originalTotalItems;
    } else {
      this.totalItems = visibleCount;
      this.currentPage = 1;
    }

    this._paginateRows();
  }

  public clearSearch() {
    this.searchValue = '';
    this._filterRows();
    // Reset resultsCount to undefined when search is cleared
    this.resultsCount = undefined;
  }

  private _paginateRows() {
    const rows = this._tableElement?.querySelectorAll('gup-table-row') ?? this.querySelectorAll('gup-table-row');
    if (rows.length === 0) return;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    let visibleIndex = 0;

    rows.forEach((row) => {
      const htmlRow = row as HTMLElement;

      if (htmlRow.dataset.filteredOut === 'true') {
        htmlRow.style.display = 'none';
        return;
      }

      if (visibleIndex >= startIndex && visibleIndex < endIndex) {
        htmlRow.style.display = '';
      } else {
        htmlRow.style.display = 'none';
      }

      visibleIndex++;
    });
  }

  private _handlePageChange(e: CustomEvent) {
    this.currentPage = e.detail;
    this._paginateRows();
    this.onPageChange(e.detail);
  }

  private _toggleFilterPanel() {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  private _handleViewClick() {
    this.onViewClick();
  }

  private _handleApplyFilters() {
    this.filterPanelOpen = false;
    this.onFilterApply(this.appliedFilters);
  }

  private _handleClearPanelFilters() {
    this.appliedFilters = [];
    this.onClearFilters();
  }

  private _renderSearch() {
    if (!this.showSearch) return nothing;

    return html`
      <div class="search-container">
        <gup-input-field
          class="search-input"
          type="text"
          .value=${this.searchValue}
          .placeholder=${this.searchPlaceholder}
          label-hidden
          @gup-input=${this._handleSearchInput}
        >
          <span slot="input-start"><gup-icon icon-name="search" width="24" height="24"></gup-icon></span>
        </gup-input-field>
        ${this.resultsCount !== undefined ? html`<span class="results-count">${this.resultsCount} results</span>` : nothing}
      </div>
    `;
  }

  private _renderFilters() {
    if (!this.showFilters) return nothing;

    const filterCount = this.appliedFilters.length;

    return html`
      <div class="button-group-container">
        ${
          this.showViewButton
            ? html`
            <gup-button appearance="secondary" @gup-click=${this._handleViewClick}>
              ${this.viewButtonIcon ? html`<gup-icon slot="icon-start" icon-name="${this.viewButtonIcon}" width="24" height="24"></gup-icon>` : nothing}
              ${this.viewButtonText}
            </gup-button>
          `
            : nothing
        }
        <gup-button
          appearance="${this.filterPanelOpen ? 'primary' : 'secondary'}"
          @gup-click=${this._toggleFilterPanel}
          class="${this.filterPanelOpen ? 'filter-button-active' : ''}"
        >
          <gup-icon slot="icon-start" icon-name="filter-list" width="24" height="24"></gup-icon>
          Filter${filterCount > 0 ? ` (${filterCount})` : ''}
        </gup-button>
      </div>
      ${this._renderFilterPanel()}
    `;
  }

  private _getSelectedFilterCount(): number {
    // Count filters that have values set
    return this.filters.filter((filter) => {
      const appliedFilter = this.appliedFilters.find((f) => f.key === filter.key);
      return appliedFilter && appliedFilter.value;
    }).length;
  }

  private _renderFilterPanel() {
    if (!this.filterPanelOpen || this.filters.length === 0) return nothing;

    const selectedCount = this._getSelectedFilterCount();

    return html`
      <div class="filter-panel">
        <div class="filter-panel-content">
          <slot name="filters">
            ${this.filters.map(
              (filter) => html`
                <div class="filter-field">
                  <label class="filter-label">${filter.label}</label>
                  <gup-input-field
                    type="${filter.type === 'date' ? 'date' : 'text'}"
                    label-hidden
                  >
                    ${filter.label}
                  </gup-input-field>
                </div>
              `
            )}
          </slot>
        </div>
        <div class="filter-panel-actions">
          <gup-button appearance="text" @gup-click=${this._handleClearPanelFilters}>
            Clear
          </gup-button>
          <gup-button @gup-click=${this._handleApplyFilters}>
            Apply${selectedCount > 0 ? ` (${selectedCount})` : ''}
          </gup-button>
        </div>
      </div>
    `;
  }

  private _renderMobileFilters() {
    if (!this.showFilters) return nothing;

    const filterCount = this.appliedFilters.length;
    const isFilterPanelOpen = this.filterPanelOpen;

    return html`
      <div class="mobile-filters">
        ${this.mobileActionButtons.map(
          (label) => html`
            <gup-button
              appearance="secondary"
              class="mobile-action-button"
            >
              <gup-icon slot="icon-start" icon-name="add" width="24" height="24"></gup-icon>
              ${label}
            </gup-button>
          `
        )}
        <gup-button
          appearance="${isFilterPanelOpen ? 'primary' : 'secondary'}"
          class="mobile-filters-button ${isFilterPanelOpen ? 'mobile-filters-button--active' : ''}"
          @gup-click=${this._toggleFilterPanel}
        >
          <gup-icon slot="icon-start" icon-name="${isFilterPanelOpen ? 'close' : 'filter-list'}" width="24" height="24"></gup-icon>
          ${this.filtersButtonText}${filterCount > 0 ? ` (${filterCount})` : ''}
        </gup-button>

        ${isFilterPanelOpen ? this._renderMobileFilterPanel() : nothing}
      </div>
    `;
  }

  private _renderMobileFilterPanel() {
    if (this.filters.length === 0) return nothing;

    return html`
      <div class="mobile-filter-panel">
        <div class="mobile-filter-panel-content">
          <slot name="filters">
            ${this.filters.map(
              (filter) => html`
                <div class="filter-field">
                  <label class="filter-label">${filter.label}</label>
                  <gup-input-field
                    type="${filter.type === 'date' ? 'date' : 'text'}"
                    label-hidden
                    placeholder="${filter.type === 'select' ? 'Select' : ''}"
                  >
                    ${filter.label}
                    ${filter.type === 'date' ? html`<gup-icon slot="input-start" icon-name="calendar" width="24" height="24"></gup-icon>` : nothing}
                  </gup-input-field>
                </div>
              `
            )}
          </slot>
        </div>
      </div>
    `;
  }

  private _renderPagination() {
    const startItem = this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);

    return html`
      <div class="pagination-container">
        <span class="items-info">${startItem}-${endItem} of ${this.totalItems} items</span>
        ${
          this.totalItems > 0
            ? html`
              <slot name="pagination">
                <gup-pagination
                  .totalPages=${Math.ceil(this.totalItems / this.itemsPerPage)}
                  .currentPage=${this.currentPage}
                  @gup-page-change=${this._handlePageChange}
                ></gup-pagination>
              </slot>
            `
            : nothing
        }
      </div>
    `;
  }

  private _renderEmptyState() {
    return html`
      <div class="empty-state">
        <h3 class="empty-state-title">${this.emptyTitle}</h3>
        <p class="empty-state-description">${this.emptyDescription}</p>
      </div>
    `;
  }

  private _renderDesktopLayout() {
    const isEmpty = this.totalItems === 0;

    return html`
      <div class="data-table-header">
        ${this.title ? html`<h2 class="title">${this.title}</h2>` : nothing}
        ${this.description ? html`<p class="description">${this.description}</p>` : nothing}
      </div>

      <div class="table-content-wrapper ${isEmpty ? 'table-content-wrapper--empty' : ''}">
        <div class="table-controls">
          <div class="table-controls-left">
            ${this._renderSearch()}
          </div>
          <div class="table-controls-right">
            ${this._renderFilters()}
          </div>
        </div>

        ${isEmpty ? this._renderEmptyState() : html`<gup-table></gup-table>`}
      </div>

      ${this._renderPagination()}
    `;
  }

  private _renderMobileLayout() {
    const isEmpty = this.totalItems === 0;

    return html`
      <div class="mobile-controls">
        ${this._renderSearch()}
        ${this._renderMobileFilters()}
      </div>

      ${
        isEmpty
          ? this._renderEmptyState()
          : html`
            <div class="mobile-cards">
              <slot></slot>
            </div>
          `
      }
    `;
  }

  render() {
    return html`
      <div class="data-table ${this.layout === 'stacked' ? 'data-table--stacked' : ''}">
        ${this.layout === 'stacked' ? this._renderMobileLayout() : this._renderDesktopLayout()}
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
