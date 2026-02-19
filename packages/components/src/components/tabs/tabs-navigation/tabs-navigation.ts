import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './tabs-navigation.css?inline';
import { Tabs } from '../tabs/tabs';
import { TabsAppearance } from '../tabs/tabs.type';

/**
 * A wrapper for navigation buttons of a tab group
 *
 * @slot - A slot for gup-tab elements
 */
@customElement('gup-tabs-navigation')
export class TabsNavigation extends GupComponent {
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

  render() {
    return html`
      <div class="inner inner--appearance-${this.tabsAppearance}${this.tabsIsFullWidth ? ' inner--is-full-width' : ''}">
        <div role="tablist" class="list">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
