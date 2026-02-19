import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './breadcrumbs-item.css?inline';

/**
 * A single breadcrumbs item. To be used as children of `gup-breadcrumbs`.
 *
 * @slot - A slot for the breadcrumb label
 */
@customElement('gup-breadcrumbs-item')
export class BreadcrumbsItem extends GupComponent {
  /** Breadcrumb URL */
  @property() href!: string;

  /** If the breadcrumb is current */
  @property({ type: Boolean }) current = false;

  /** @internal */
  @property({ reflect: true }) role = 'listitem';

  render() {
    return html`
      <a class="link" href="${this.href}" aria-current="${this.current ? 'page' : 'false'}">
        <slot></slot>
      </a>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
