import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './tab.css?inline';
import { TabsAppearance } from '../tabs/tabs.type';
import { Tabs } from '../tabs/tabs';

/**
 * A button for a single tab in a tab group
 *
 * @slot - A slot for button label
 * @slot icon-start - The icon to display at the start of the tab
 * @slot icon-end - The icon to display at the end of the tab
 *
 * @event gup-tab-click - Dispatched when the tab is clicked. Event details contain the index of the tab.
 */
@customElement('gup-tab')
export class Tab extends GupComponent {
  /** Whether the tab is disabled or not */
  @property({ type: Boolean }) disabled = false;

  /** Whether the tab is selected or not */
  @property({ type: Boolean, reflect: true }) selected = false;

  private slotContentAsText!: string;

  @state() private tabsAppearance: string = TabsAppearance.Default;
  @state() private tabsIsFullWidth: boolean = false;

  firstUpdated() {
    this.getTabsAppearance();
    this.getTabsIsFullWidth();
  }

  private async getTabsAppearance(): Promise<void> {
    await customElements.whenDefined('gup-tabs');
    const tabs = this.closest<Tabs>('gup-tabs');
    this.tabsAppearance = tabs ? tabs.appearance : '';
  }

  private async getTabsIsFullWidth(): Promise<void> {
    await customElements.whenDefined('gup-tabs');
    const tabs = this.closest<Tabs>('gup-tabs');
    this.tabsIsFullWidth = tabs ? tabs.isFullWidth : false;
  }

  private handleClick() {
    if (!this.selected) {
      const allTabs = Array.from(this.parentElement?.querySelectorAll('gup-tab') || []);
      const index = allTabs.indexOf(this);
      const event = new CustomEvent('gup-tab-click', {
        bubbles: true,
        composed: true,
        detail: index,
      });
      this.dispatchEvent(event);
      this.selected = true;
      this.requestUpdate('selected');
    }
  }

  private handleSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement)?.assignedNodes({ flatten: true });
    this.slotContentAsText = childNodes
      .map((node) => {
        return node.textContent ? node.textContent.trim() : '';
      })
      .join('');
  }

  render() {
    return html`
      <button class="button button--appearance-${this.tabsAppearance}${this.tabsIsFullWidth ? ' button--is-full-width' : ''}" @click="${this.handleClick}" role="tab" aria-selected="${this.selected}" ?disabled="${this.disabled && !this.selected}">
        <slot name="icon-start"></slot>
        <div class="content" data-title="${this.slotContentAsText}">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        <slot name="icon-end"></slot>
      </button>

    `;
  }

  static readonly styles = unsafeCSS(styles);
}
