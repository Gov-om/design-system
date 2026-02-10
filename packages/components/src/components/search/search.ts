import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './search.css?inline';
import { event, EventDispatcher } from '../../utils/decorators/event';
import '../icon/icon';
import '../button/button';

/**
 * Search component that allows searching for stuff.
 *
 * @event gup-change - Dispatched when the value of the search input changes on `input` event. Event details contain the new value
 * @event gup-click - Dispatched when the search field is clicked. Event details contain the click event
 * @event gup-clear - Dispatched when the clear value button is clicked
 * @event gup-submit - Dispatched when the search button is clicked. Event details contain the search value
 *
 * @dependency gup-icon
 * @dependency gup-button
 */
@customElement('gup-search')
export class Search extends GupComponent {
  /** The name of the search input */
  @property() name = '';

  /** The label for the search input */
  @property() label = '';

  /** If the component to appear disabled */
  @property({ type: Boolean }) disabled = false;

  /** The placeholder for the search input */
  @property() placeholder = '';

  /** Current value text */
  @property() value = '';

  /** An aria-label for the search button */
  @property({ attribute: 'search-label' }) searchLabel = 'Search';

  /** An aria-label for the reset button */
  @property({ attribute: 'reset-label' }) resetLabel = 'Clear';

  @event('gup-click') private onClick!: EventDispatcher<PointerEvent>;

  @event('gup-change') private onChange!: EventDispatcher<string>;

  @event('gup-clear') private onClear!: EventDispatcher<void>;

  @event('gup-submit') private onSubmit!: EventDispatcher<string>;

  private onSearchInput(e: Event) {
    const input = e.target as HTMLInputElement | null;
    const oldValue = this.value;
    if (input) {
      this.value = input.value;
      if (oldValue !== this.value) {
        this.onChange(this.value);
      }
    }
  }

  private onClearClick(e: PointerEvent) {
    // this is to prevent the gup-click event from gup-button from bubbling and being retargeted to this component host
    e.stopPropagation();
    this.value = '';
    this.onClear();
  }

  private onInputClick(e: PointerEvent) {
    this.onClick(e);
  }

  private onSubmitButtonClick(e: PointerEvent) {
    // this is to prevent the gup-click event from gup-button from bubbling and being retargeted to this component host
    e.stopPropagation();
    this.submit();
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.submit();
    }
  }

  private submit(): void {
    this.onSubmit(this.value);
  }

  render() {
    return html`
    <div class="input-container">
      <input class="input"
        id="${this.name}"
        type="search"
        .value="${this.value}"
        placeholder="${this.placeholder}"
        @input=${this.onSearchInput}
        @keydown=${this.onKeydown}
        @click=${this.onInputClick}
        ?disabled="${this.disabled}"
        aria-label="${this.label}"
      />
      <div class="controls-container">
        ${
          this.value &&
          html`
          <gup-button ?with-icon-only="${true}" ?disabled="${this.disabled}" @gup-click=${this.onClearClick} appearance="text" type="reset" label="${this.resetLabel}">
            <gup-icon icon-name="close" height="20" width="20" class="close-icon"></gup-icon>
          </gup-button>
        `
        }
        <gup-button ?with-icon-only="${true}" ?disabled="${this.disabled}" @gup-click=${this.onSubmitButtonClick} label="${this.searchLabel}">
          <gup-icon icon-name="search" height="24" width="24"></gup-icon>
        </gup-button>
      </div>
    </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
