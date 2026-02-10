import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './tab-panel.css?inline';

/**
 * A single panel in a tab group that contains the content of the tab.
 *
 * @slot - A slot for tab content
 */
@customElement('gup-tab-panel')
export class TabPanel extends GupComponent {
  render() {
    return html`
      <div role="tabpanel" class="inner">
        <slot></slot>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
