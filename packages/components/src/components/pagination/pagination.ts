import { html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './pagination.css?inline';
import '../icon/icon';
import { isEmpty } from '../../utils/helpers';

/**
 * Pagination component that allows navigating through a list of pages.
 *
 * @event gup-page-change - Dispatched when the page changes. Event details contain the new page number
 *
 * @dependency gup-icon
 */
@customElement('gup-pagination')
export class Pagination extends GupComponent {
  /** The total number of pages. */
  @property({ type: Number, attribute: 'total-pages', reflect: true }) totalPages = 10;

  /** The current active page. */
  @property({ type: Number, attribute: 'current-page', reflect: true }) currentPage = 1;

  /** Pagination type */
  @property({ reflect: true }) kind: 'directional' | 'numbered' = 'numbered';

  /** The label for the "Previous" button. */
  @property({ attribute: 'prev-label' }) prevLabel = 'Previous';

  /** The title for the "Previous" button. Used with directional kind */
  @property({ attribute: 'prev-title' }) prevTitle = '';

  /** The link for the "Previous" button. Used with directional kind */
  @property({ attribute: 'prev-link' }) prevLink = '';

  /** The label for the "Next" button */
  @property({ attribute: 'next-label' }) nextLabel = 'Next';

  /** The title for the "Next" button. Used with directional kind */
  @property({ attribute: 'next-title' }) nextTitle = '';

  /** The link for the "Next" button. Used with directional kind */
  @property({ attribute: 'next-link' }) nextLink = '';

  private pages: (number | string)[] = Array.from(new Array(this.totalPages), (_, i) => i + 1);
  private maxPagesPerView = 7;
  private visiblePages: (string | number)[] = [];

  update(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('totalPages')) {
      this.pages = Array.from(new Array(this.totalPages), (_x, i) => i + 1);
    }
    if (changedProperties.has('currentPage')) {
      this.currentPage;
    }
    super.update(changedProperties);
  }

  private handlePageChange(page: number): void {
    this.dispatchEvent(
      new CustomEvent('gup-page-change', {
        bubbles: true,
        composed: true,
        detail: page,
      })
    );
    if (page !== this.currentPage) {
      this.currentPage = page;
    }
  }

  private renderPages(): TemplateResult {
    const lastPage = this.pages.length;
    let startOfPages: (string | number)[] = [];
    let extraPages: unknown[];
    if (this.totalPages > this.maxPagesPerView) {
      if (this.pages.length - this.currentPage >= 4) {
        if (this.currentPage - (this.pages[0] as number) >= 4) {
          startOfPages = this.pages.slice(this.currentPage - 5);
          extraPages = this.pages.slice(this.currentPage, -1);
          this.visiblePages = startOfPages.filter((item) => !extraPages.includes(item));
          this.visiblePages.splice(this.visiblePages.length - 1, 0, '...');
        } else if (this.currentPage - (this.pages[0] as number) < 4) {
          startOfPages = this.pages.slice(0, 5);
          extraPages = this.pages.slice(startOfPages.length, lastPage - 1);
          this.visiblePages = startOfPages.filter((item) => !extraPages.includes(item));
          this.visiblePages.splice(this.visiblePages.length, 0, '...');
          this.visiblePages = ([] as (string | number)[]).concat(this.visiblePages, lastPage);
        }
      }
      if (lastPage - this.currentPage <= 4) {
        this.visiblePages = this.pages.slice(lastPage - 1 - 4);
        this.visiblePages = ([] as (string | number)[]).concat(this.pages[0], '...', this.visiblePages);
      }
    } else if (this.totalPages <= this.maxPagesPerView) {
      this.visiblePages = this.pages;
    }

    return html`
      ${this.visiblePages.map(
        (page) => html`
        <li class="page-wrapper">
          <button
          class=${`page-button ${page === this.currentPage ? 'page-button--is-current' : ''}`}
          @click=${() => this.handlePageChange(Number(page))}
          aria-current="${page === this.currentPage ? 'page' : 'false'}"
          ?disabled="${typeof page == 'string'}">
            <span class=${`text ${typeof page == 'string' ? 'text--is-disabled' : ''}`}>
              ${page}
            </span>
        </button>
        </li>
      `
      )}
    `;
  }

  render() {
    const navigationalItems = [
      { label: this.prevLabel, title: this.prevTitle, link: this.prevLink, iconName: 'arrow-back' },
      { label: this.nextLabel, title: this.nextTitle, link: this.nextLink, iconName: 'arrow-forward' },
    ].filter((item) => !isEmpty(item.label) && !isEmpty(item.link));

    return html`
    ${
      this.kind === 'numbered'
        ? html`
      <nav>
      <ul class="pagination">
          ${
            this.currentPage > 1
              ? html`
          <li>
            <button class="directional-button" @click=${() => this.handlePageChange(this.currentPage - 1)}>
              <gup-icon class="arrow-icon" icon-name="arrow-back" width="24" height="24"></gup-icon>
              <span class="text">
                ${this.prevLabel}
              </span>
          </button>
          </li>`
              : null
          }
          ${this.renderPages()}
          ${
            this.currentPage < this.totalPages
              ? html`
          <li>
            <button class="directional-button" @click=${() => this.handlePageChange(this.currentPage + 1)}>
              <span class="text">
                ${this.nextLabel}
              </span>
              <gup-icon class="arrow-icon" icon-name="arrow-forward" width="24" height="24"></gup-icon>
          </button>
          </li>`
              : null
          }
        </ul>
        </nav>
    `
        : html`
    <nav>
      <div class="links-wrapper">
      ${navigationalItems.map(
        ({ label, title, link, iconName }) => html`
            <a href="${link}" class="nav-link ${label === this.prevLabel && this.prevLabel ? 'nav-link--direction-prev' : 'nav-link--direction-next'}" rel="${
              label === this.prevLabel && this.prevLabel ? 'prev' : 'next'
            }">
              ${label === this.prevLabel && this.prevLabel ? html`<gup-icon icon-name="${iconName}" class="arrow-icon" width="24" height="24"></gup-icon>` : null}
              <span class="text-box">
                <span class="label">
                  ${label}
                </span>
                <span class="title">
                  ${title}
                </span>
              </span>
              ${label === this.nextLabel && this.nextLabel ? html`<gup-icon icon-name="${iconName}" class="arrow-icon" width="24" height="24"></gup-icon>` : null}
            </a>
          `
      )}
      </div>
    </nav>
    `
    }
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
