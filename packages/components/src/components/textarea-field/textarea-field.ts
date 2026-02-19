import { html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { GupComponent } from '../../styles/styles';
import styles from './textarea-field.css?inline';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../utils/decorators/watch';
import { event, EventDispatcher } from '../../utils/decorators/event';
import { innerInputValidators } from '../../utils/form-validators';
import { HasSlotController } from '../../utils/slot-controller';
import { getAriaDescribedBy } from '../../utils/helpers';
import '../icon/icon';
import '../form-hint/form-hint';
import '../form-validation-message/form-validation-message';

/**
 * A textarea with a label, hint, and validation message. Compatible with native HTML form element.
 *
 * @slot - Label text for the input field. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive content like links or buttons
 * @slot hint - Optional text that appears below the field if provided, used to guide the user about the input requirements or expected format
 *
 * @event gup-change - Emitted when value changes
 * @event gup-input - Emitted when value gets changed on input event
 * @event gup-invalid - Emitted on error, contains validity state
 *
 * @dependency gup-icon
 * @dependency gup-form-hint
 * @dependency gup-form-validation-message
 */
@customElement('gup-textarea-field')
export class TextareaField extends FormControlMixin(GupComponent) {
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static readonly formControlValidators = innerInputValidators;

  /** Whether the field is required in the HTML form */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Name of the textarea – gets submitted with the form data */
  @property()
  name = '';

  /** Default value for the textarea */
  @property()
  value = '';

  /** Placeholder */
  @property()
  placeholder = '';

  /** Is field disabled or not */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Sets minimum number of characters in the textarea */
  @property({ type: Number, reflect: true })
  minlength?: number;

  /** Sets maximum number of characters in the textarea */
  @property({ type: Number, reflect: true })
  maxlength?: number;

  /** Sets row number */
  @property({ type: Number, reflect: true })
  rows?: number = 4;

  /** Custom error message to show when the textarea is invalid. Default is browser-provided localisation. If you use this prop, your application is responsible for translation */
  @property({ attribute: 'error-message' })
  errorMessage = '';

  @state() private dirty = false;
  @state() private focused = false;

  /** @internal */
  @query('textarea')
  validationTarget!: HTMLInputElement;

  @watch('value')
  async handleValueChange(): Promise<void> {
    this.setValue(this.value);
    this.dirty = !!this.value;

    await this.validationComplete;

    this.requestUpdate();
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint');

  private handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onInput(value);
  }

  private handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onChange(value);
  }

  @event('gup-change') private onChange!: EventDispatcher<string>;

  @event('gup-input') private onInput!: EventDispatcher<string>;

  @event('gup-invalid') private onInvalid!: EventDispatcher<ValidityState>;

  connectedCallback() {
    super.connectedCallback();
    this.internals.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  firstUpdated() {
    this.setValue(this.value);
  }

  reportValidity() {
    this.requestUpdate();
    return this.checkValidity();
  }

  validityCallback(): string | void {
    this.onInvalid(this.internals.validity);
    return this.errorMessage || this.validationTarget?.validationMessage;
  }

  valueChangedCallback(value: string): void {
    this.value = value;
  }

  private renderInvalidMessage(): TemplateResult {
    return !this.checkValidity()
      ? html`<gup-form-validation-message class="validation-message" id="error-message">
        ${this.validationMessage}
        </gup-form-validation-message>`
      : html``;
  }

  render(): TemplateResult {
    return html`
      <div class="${classMap({
        'host-inner': true,
        'invalid': !this.checkValidity(),
        'required': this.required,
        'focused': this.focused,
        'dirty': this.dirty,
      })}">
        <label class="label" for="input"><slot></slot></label>

        ${this.renderInvalidMessage()}
        <div class="input-wrapper">
          <div class="input-inner-wrapper">
            <textarea
              aria-describedby="${getAriaDescribedBy(this.hasSlotController.test('hint'), !this.checkValidity())}"
              aria-invalid="${this.checkValidity() ? 'false' : 'true'}"
              id="input"
              class="input"
              name="${this.name}"
              rows="${ifDefined(this.rows)}"
              minlength="${ifDefined(this.minlength)}"
              maxlength="${ifDefined(this.maxlength)}"
              placeholder="${ifDefined(this.placeholder)}"
              @change="${this.handleChange}"
              @input="${this.handleInput}"
              @focus="${() => (this.focused = true)}"
              @blur="${() => (this.focused = false)}"
              ?required=${this.required}
              ?disabled=${this.disabled}
              .value="${live(this.value)}"
            ></textarea>
          </div>
        </div>
        ${this.hasSlotController.test('hint') ? html`<gup-form-hint class="hint" id="hint"><slot name="hint"></slot></gup-form-hint>` : ''}
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
