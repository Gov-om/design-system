import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './file-item.css?inline';

/**
 * A file item component that displays file information and affords an extra action. Use it to render a list of files.
 *
 * @slot - Action button
 */
@customElement('gup-file-item')
export class FileItem extends GupComponent {
  /** The file name */
  @property({ reflect: true, attribute: 'file-name' }) fileName!: string;

  /** File metadata or any other supplementary information */
  @property({ reflect: true }) subtitle!: string;

  /** Optional URL to download the file */
  @property({ reflect: true }) url = '';

  /** Thumbnail source if available */
  @property({ reflect: true, attribute: 'thumbnail-src' }) thumbnailSrc?: string;

  /** Thumbnail alt text if available */
  @property({ reflect: true, attribute: 'thumbnail-alt' }) thumbnailAlt?: string;

  render() {
    return html`
      <div class="inner">
        ${this.thumbnailSrc ? html`<img src="${this.thumbnailSrc}" alt="${this.thumbnailAlt || ''}" class="thumbnail">` : ''}
        <div class="meta">
          <h2 class="title">
            ${this.url ? html`<a href="${this.url}" download="${this.fileName}" class="link">${this.fileName}</a>` : this.fileName}
          </h2>
          <small class="subtitle">${this.subtitle}</small>
        </div>
        <slot></slot>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
