import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './spinner.css?inline';

import '../screenreader-text/screenreader-text';

/**
 * A loading spinner component.
 *
 * @cssprop --gup-spinner--font-size - The font size of the spinner label
 * @cssprop --gup-spinner--size - The width and height of the spinner itself
 *
 * @dependency gup-screenreader-text
 */
@customElement('gup-spinner')
export class Spinner extends GupComponent {
  /** The size of the spinner */
  @property({ reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'm';

  /** An optional label to display below the spinner */
  @property() label = 'Loading...';

  /** If `true`, the label is hidden visually and only available to screenreaders */
  @property({ type: Boolean, attribute: 'label-hidden' }) labelHidden = false;

  render() {
    return html`
      <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
        <mask id="mask0_8814_13864" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" >
          <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 -5.4282e-06 31.0457 -3.49691e-06 20C-1.56562e-06 8.9543 8.9543 1.56562e-06 20 3.49691e-06C31.0457 5.4282e-06 40 8.95431 40 20ZM6 20C6 27.732 12.268 34 20 34C27.732 34 34 27.732 34 20C34 12.268 27.732 6 20 6C12.268 6 6 12.268 6 20Z" />
        </mask>
        <g mask="url(#mask0_8814_13864)">
          <circle class="circle" cx="20" cy="20" r="20" />
          <path class="indicator" d="M40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40L20 20L40 20Z"/>
        </g>
      </svg>
      ${this.labelHidden ? html`<gup-screenreader-text>${this.label}</gup-screenreader-text>` : html`<span class="label">${this.label}</span>`}
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
