import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './tabs.css?inline';
import { Tab } from '../tab/tab';
import { TabPanel } from '../tab-panel/tab-panel';
import { TabsAppearance } from './tabs.type';

/**
 * A wrapper for a tab group
 *
 * @slot - A slot for a single `gup-tabs-navigation` element with navigation buttons of the tab group and multiple `gup-tab-panel` elements with content of the tabs
 */
@customElement('gup-tabs')
export class Tabs extends GupComponent {
  /** Visual appearance */
  @property({ reflect: true }) appearance: TabsAppearance = TabsAppearance.Default;

  /** Whether the tabs should take the full width of the container. Only relevant when the `appearance` is set to `default` or `toggle` */
  @property({ type: Boolean, reflect: true, attribute: 'is-full-width' }) isFullWidth = false;

  private selectedTabIndex = 0;
  private tabs: Tab[] = [];
  private panels: TabPanel[] = [];

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    root.addEventListener('gup-tab-click', (event: Event) => this.selectTab((<CustomEvent>event).detail as number));
    return root;
  }

  handleSlotChange() {
    this.tabs = Array.from(this.querySelectorAll('gup-tab'));
    this.panels = Array.from(this.querySelectorAll('gup-tab-panel'));
    this.initializeTabs();
  }

  private initializeTabs() {
    if (this.tabs.length > 0) {
      if (this.tabs.some((tab) => tab.selected)) {
        this.selectTab(this.tabs.findIndex((tab) => tab.selected));
      } else {
        this.selectTab(0);
      }
    }
  }

  /** Selects a tab by its index */
  public selectTab(index: number): void {
    this.selectedTabIndex = index;
    this.tabs.forEach((tab, i) => (tab.selected = i === this.selectedTabIndex));
    this.panels.forEach((panel, i) => (panel.hidden = i !== this.selectedTabIndex));
  }

  render() {
    return html`<slot @slotchange="${this.handleSlotChange}"></slot>`;
  }

  static readonly styles = unsafeCSS(styles);
}
