import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GupComponent } from '../../../styles/styles';
import styles from './stepper.css?inline';
import { StepperItem } from '../stepper-item/stepper-item';
import '../../icon/icon';
import '../../track/track';
import '../../button/button';

/**
 * Stepper is a component that displays a sequence of steps that users can follow to complete a process.
 *
 * @slot - should only contain `gup-stepper-item` elements
 *
 * @cssprop --gup-stepper--continued - This CSS boolean variable (possible values 0 or 1) can enable or disable numerical styles in nested components by multiplying their values within a calc() function, according to the value of `continued` prop
 *
 * @dependency gup-track
 * @dependency gup-button
 * @dependency gup-icon
 */
@customElement('gup-stepper')
export class Stepper extends GupComponent {
  /** Display toggle all items button */
  @property({ type: Boolean, reflect: true, attribute: 'toggle-all-displayed' }) toggleAllDisplayed = false;

  /** Show all items button label */
  @property({ attribute: 'show-all-label' }) showAllLabel = 'Show all steps';

  /** Hide all items button label */
  @property({ attribute: 'hide-all-label' }) hideAllLabel = 'Hide all steps';

  /** Enable wizard mode where all steps are open and toggle buttons are hidden */
  @property({ type: Boolean, reflect: true, attribute: 'wizard-mode' }) wizardMode = false;

  /** Enable static mode to use 'readonly' variant where the toggle functionality is unavalable */
  @property({ type: Boolean, reflect: true, attribute: 'static-mode' }) staticMode = false;

  /** Whether the stepper should appear as starting from a non first item */
  @property({ type: Boolean, reflect: true }) continued = false;

  @state() private allOpen = false;

  renderToggleAllButton(): TemplateResult {
    if (this.toggleAllDisplayed && !this.wizardMode && !this.staticMode) {
      return html`
        <gup-button id="toggle" appearance="text" @gup-click=${this.toggleAll}>
          <gup-track gap="2" vertical-alignment="center">
            <gup-icon icon-name=${`${this.allOpen ? 'remove-circle-outline' : 'add-circle-outline'}`} width="24" height="24"></gup-icon>
            ${this.allOpen ? this.hideAllLabel : this.showAllLabel}
          </gup-track>
        </gup-button>
      `;
    }
    return html``;
  }

  private get slottedChildren() {
    const slot = this.shadowRoot?.querySelector('slot');

    if (!slot) {
      return [];
    }
    return slot.assignedElements({ flatten: true });
  }

  toggleAll() {
    const items = this.slottedChildren as StepperItem[];
    items.forEach((item: StepperItem) => {
      item.open = !this.allOpen;
    });
    this.allOpen = !this.allOpen;
  }

  render() {
    return html`
      ${this.renderToggleAllButton()}
      <div class="list" role="list">
        <slot></slot>
      </div>
    `;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    const items = this.slottedChildren as StepperItem[];
    items.forEach((item: StepperItem) => {
      if (changedProperties.has('wizardMode')) {
        item.wizardMode = this.wizardMode;
      }
      if (changedProperties.has('staticMode')) {
        item.staticMode = this.staticMode;
      }
    });
  }

  static readonly styles = unsafeCSS(styles);
}
