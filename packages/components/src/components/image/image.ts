import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './image.css?inline';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HasSlotController } from '../../utils/slot-controller';

/**
 * A component for displaying images with branded captions.
 *
 * @slot caption - A slot for caption
 * @slot error - A slot for error content
 */
@customElement('gup-image')
export class Image extends GupComponent {
  /** The alt text for the image */
  @property() alt = '';

  /** The source of the image */
  @property() src = '';

  /** The error message to display when the image fails to load. overwritten by slot="error" */
  @property() errorMessage = 'Error loading image';

  /** Image loading strategy, will be ignored if the browser does not support it */
  @property() loading?: 'lazy' | 'eager';

  /** The width of the image */
  @property({ type: Number }) width?: number;

  /** The height of the image */
  @property({ type: Number }) height?: number;

  @state() private _hasError = false;

  private readonly hasSlotController = new HasSlotController(this, 'caption');

  private _handleError() {
    this._hasError = true;
  }

  private _ifErrorAndSlotUsed() {
    return this._hasError && this.querySelector('[slot="error"]');
  }

  render() {
    if (this._ifErrorAndSlotUsed()) {
      return html`<slot name="error"></slot>`;
    }

    if (this._hasError) {
      return html`<div>${this.errorMessage}</div>`;
    }

    return html`
      <figure>
        <img
          class="image"
          width="${ifDefined(this.width)}"
          height="${ifDefined(this.height)}"
          alt="${this.alt}"
          src="${this.src}"
          loading="${ifDefined(this.loading)}"
          @error=${this._handleError}
        />
        ${this.hasSlotController.test('caption') ? html`<figcaption class="caption"><slot name="caption"></slot></figcaption>` : ''}
      </figure>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
