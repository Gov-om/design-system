import { html, LitElement, nothing, TemplateResult, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControlMixin, requiredValidator } from '@open-wc/form-control';
import { event, EventDispatcher } from '../../utils/decorators/event';
import { live } from 'lit/directives/live.js';
import { HasSlotController } from '../../utils/slot-controller';
import { getAriaDescribedBy } from '../../utils/helpers';
import styles from './checkbox.css?inline';
import '../icon/icon';
import '../track/track';
import '../form-hint/form-hint';
import '../form-validation-message/form-validation-message';

/**
 * Checkbox component can be used to control checked/unchecked statuses.
 *
 * @slot - Custom HTML to render in the label. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content), avoid inserting interactive elements such as buttons or links in the slot.
 * @slot hint - Optional text that appears below the checkbox if provided, used to guide the user about the input requirements or expected format
 *
 * @cssprop --gup-checkbox--check-mark--border-radius - Border radius of the check mark
 *
 * @event gup-change - Fires whenever user change the value of the checkbox
 * @event gup-invalid - Fires when checkbox is invalid
 *
 * @dependency gup-icon
 * @dependency gup-form-hint
 * @dependency gup-form-validation-message
 */
@customElement('gup-checkbox')
export class Checkbox extends FormControlMixin(GupComponent) {
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static readonly formControlValidators = [requiredValidator];
  private readonly hasSlotController = new HasSlotController(this, 'hint');

  /** Name of the checkbox element in an HTML form. Must be unique */
  @property() name = '';

  /** Whether a checkbox is checked. Must be `false` when `indeterminate=true` */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Enable if a checkbox is supposed to be neither checked nor unchecked. `checked` must be `false` */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** The size of the checkbox */
  @property() size: 's' | 'm' = 'm';

  /** The appearance of the checkbox */
  @property() appearance: 'default' | 'circle' = 'default';

  /** Sets the checkbox value */
  @property() value = 'on';

  /** Sets checkbox as required */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Sets checkbox as disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Custom error message to show when the checkbox is invalid. Default is browser-provided localisation. If you use this prop, your application is responsible for translation */
  @property({ attribute: 'error-message' }) errorMessage = '';

  @event('gup-change') private onChange!: EventDispatcher<boolean>;

  @event('gup-invalid') private onInvalid!: EventDispatcher<ValidityState>;

  /** @internal */
  @query('[type=checkbox]')
  validationTarget!: HTMLInputElement;

  connectedCallback() {
    super.connectedCallback();
    this.internals.form?.addEventListener('submit', (e: SubmitEvent) => this.handleSubmit(e));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.internals.form?.removeEventListener('submit', (e: SubmitEvent) => this.handleSubmit(e));
  }

  reportValidity() {
    this.requestUpdate();
    return this.checkValidity();
  }

  validityCallback(): string | void {
    return this.errorMessage || this.validationTarget?.validationMessage;
  }

  shouldFormValueUpdate(): boolean {
    return this.checked;
  }

  protected async updated(changedProperties: Map<string, unknown>): Promise<void> {
    if (changedProperties.has('checked')) {
      this.setValue(this.value);
    }

    if (changedProperties.has('checked') && this.required) {
      await this.validationComplete;
      if (!this.checkValidity()) {
        this.onInvalid(this.internals.validity);
      }
      this.requestUpdate();
    }

    if (changedProperties.has('indeterminate') && changedProperties.get('indeterminate') === true) {
      if (this.checked) {
        this.checked = false;
        this.requestUpdate('checked', true);
      }
    }
  }

  private handleSubmit(e: SubmitEvent) {
    if (!this.reportValidity()) {
      this.onInvalid(this.internals.validity);
      e.preventDefault();
    }
  }

  private handleChange(event: CustomEvent) {
    if (this.disabled) {
      return;
    }
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(target.checked);
    this.indeterminate = false;
  }

  render() {
    let icon = '';

    if (this.checked) icon = 'check';
    if (this.indeterminate) icon = 'remove';

    const invalidMessage: TemplateResult | typeof nothing = this.checkValidity()
      ? nothing
      : html`
      <gup-form-validation-message class="error" id="error-message">
        ${this.validationMessage}
      </gup-form-validation-message>
    `;

    return html`
      ${invalidMessage}
      <label class="native-label">
        <input
          id="input"
          class="native-input"
          type="checkbox"
          aria-describedby=${getAriaDescribedBy(this.hasSlotController.test('hint'), !this.checkValidity())}
          .required=${live(this.required)}
          name=${this.name}
          .indeterminate=${this.indeterminate}
          value=${ifDefined(this.value)}
          ?disabled=${this.disabled}
          .checked=${live(this.checked)}
          @change=${this.handleChange}
        />
        <div class="check-mark">
          <div class="check-mark-inner">
            ${
              icon
                ? html`
                    <gup-icon icon-name="${icon}" class="icon" width="20" height="20"></gup-icon>`
                : null
            }
          </div>
        </div>
        <div class="text-container">
          <div><slot></slot></div>
          ${this.hasSlotController.test('hint') ? html`<gup-form-hint id="hint"><slot name="hint"></slot></gup-form-hint>` : ''}
        </div>
      </label>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
