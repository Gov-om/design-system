import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './stepper-item.css?inline';
import '../../icon/icon';
import '../../track/track';
import '../../accordion/accordion-item/accordion-item';

/**
 * A stepper item. To be used inside of `gup-stepper`.
 *
 * @slot - The collapsible content of a step
 * @slot label - The label content. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive elements like links or buttons
 *
 * @cssprop --gup-stepper-item--label--color - The color of the step label
 * @cssprop --gup-stepper-item--selected--label--color - The label color of the current step
 *
 * @dependency gup-accordion-item
 * @dependency gup-track
 * @dependency gup-icon
 */
@customElement('gup-stepper-item')
export class StepperItem extends GupComponent {
  /** The label of the step */
  @property() label = '';

  /** The number of the step */
  @property({ attribute: 'step-number' }) stepNumber = '';

  /** Set the type of the left side of the accordion */
  @property({ attribute: 'step-type', reflect: true }) stepType: 'default' | 'done' | 'selected' | 'and' = 'default';

  /** A translatable label for the accordion And indicator */
  @property({ attribute: 'label-and' }) labelAnd = 'and';

  /** Whether the stepper is in wizard mode or not */
  @property({ type: Boolean, attribute: 'wizard-mode' }) wizardMode = false;

  /** Whether the step item is static and not interactive. This is set to `true` automatically when inside of `gup-stepper` with `static-mode="true"`  */
  @property({ type: Boolean, reflect: true, attribute: 'static-mode' }) staticMode = false;

  /** Whether the step is open or not */
  @property({ type: Boolean, reflect: true }) open = false;

  /** A translatable label for the accordion Show indicator */
  @property({ attribute: 'label-show' }) labelShow = 'Show';

  /** A translatable label for the accordion Hide indicator */
  @property({ attribute: 'label-hide' }) labelHide = 'Hide';

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'listitem');
    if (this.wizardMode || this.staticMode) {
      this.open = true;
    }
  }

  private renderStepNumber() {
    if (this.stepType === 'done') {
      return html`<gup-icon width="20" height="20" icon-name="check"></gup-icon>`;
    } else {
      return this.stepType === 'and' ? this.labelAnd : this.stepNumber;
    }
  }

  render() {
    const slotLabel = html`<span slot="label" class="label"><slot name="label"></slot></span>`;
    const slotContent = html`<div class="content"><slot></slot></div>`;

    return html`
      <div class="track">
        <div class="step-number">
          <div class="step-number-inner">
            ${this.renderStepNumber()}
          </div>
        </div>
        ${
          this.staticMode
            ? html`
              <div class="static-content">
                ${slotLabel}
                ${slotContent}
              </div>
            `
            : html`
              <gup-accordion-item class="accordion stepper-accordion" .open="${this.wizardMode || this.open}" @gup-toggle=${(e: CustomEvent) => (this.open = e.detail)} label-show=${this.labelShow} label-hide=${this.labelHide} ?hide-controls="${this.wizardMode}">
                ${slotLabel}
                ${slotContent}
              </gup-accordion-item>
            `
        }
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
