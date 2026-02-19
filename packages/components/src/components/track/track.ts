import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './track.css?inline';
import { TrackDirection } from './track.type';

/**
 * A simple flex-based utility component for laying out stuff
 *
 * @slot - Items to be laid out. If you want to put an unstyled text into the track, ensure each piece of text is wrapped in an HTML element (eg., a `span`)
 */
@customElement('gup-track')
export class Track extends GupComponent {
  /** Spacing between the items in multiples of --unit CSS variable */
  @property({ type: Number }) gap = 2;

  /** All items in a row have same width */
  @property({ type: Boolean, reflect: true, attribute: 'items-equal' }) itemsEqual = false;

  /** Equivalent of flex-wrap in CSS */
  @property({ type: Boolean, attribute: 'is-multiline' }) isMultiline = false;

  /** Equivalent of justify-content in CSS */
  @property({ attribute: 'horizontal-alignment' }) horizontalAlignment: 'normal' | 'left' | 'center' | 'right' | 'justify' = 'normal';

  /** Equivalent of align-items in CSS */
  @property({ attribute: 'vertical-alignment' }) verticalAlignment: 'normal' | 'top' | 'center' | 'bottom' = 'normal';

  /** Equivalent of flex-direction in CSS */
  @property({ reflect: true }) direction: TrackDirection = 'horizontal';

  render() {
    return html`
      <slot></slot>
    `;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('gap')) {
      this.style.setProperty('--gap', `calc(${this.gap} * var(--unit))`);
    }

    if (changedProperties.has('horizontalAlignment')) {
      this.style.setProperty(
        '--horizontal-alignment',
        `
        ${this.horizontalAlignment === 'normal' ? 'normal' : ''}
        ${this.horizontalAlignment === 'left' ? 'flex-start' : ''}
        ${this.horizontalAlignment === 'right' ? 'flex-end' : ''}
        ${this.horizontalAlignment === 'center' ? 'center' : ''}
        ${this.horizontalAlignment === 'justify' ? 'space-between' : ''}
      `
      );
    }

    if (changedProperties.has('verticalAlignment')) {
      this.style.setProperty(
        '--vertical-alignment',
        `
        ${this.verticalAlignment === 'top' ? 'flex-start' : ''}
        ${this.verticalAlignment === 'center' ? 'center' : ''}
        ${this.verticalAlignment === 'bottom' ? 'flex-end' : ''}
      `
      );
    }

    if (changedProperties.has('direction')) {
      this.style.setProperty(
        '--direction',
        `
        ${this.direction === 'horizontal' ? 'row' : ''}
        ${this.direction === 'vertical' ? 'column' : ''}
      `
      );
    }

    if (changedProperties.has('isMultiline')) {
      this.style.setProperty('--wrap', this.isMultiline ? 'wrap' : '');
    }
  }

  static readonly styles = unsafeCSS(styles);
}
