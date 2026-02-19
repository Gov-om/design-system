import { html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { GupComponent } from '../../styles/styles';
import styles from './input-field.css?inline';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HasSlotController } from '../../utils/slot-controller';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../utils/decorators/watch';
import { event, EventDispatcher } from '../../utils/decorators/event';
import { GupIconName } from '@govom/icons/dist/index.d';
import { innerInputValidators } from '../../utils/form-validators';
import { getAriaDescribedBy } from '../../utils/helpers';
import '../icon/icon';
import '../screenreader-text/screenreader-text';
import '../form-hint/form-hint';
import '../form-validation-message/form-validation-message';

export type InputFieldType = 'text' | 'email' | 'date' | 'time' | 'password' | 'number' | 'numeric' | 'tel' | 'url';

/**
 * An input field with a label, hint, and validation message. Compatible with native HTML form element.
 *
 * @slot - Label text for the input field. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive content like links or buttons
 * @slot prefix - A slot for non-interactive content (eg indicating a starting part of the value) before the input
 * @slot suffix - A slot for non-interactive content (eg indicating an ending part of the value) after the input
 * @slot input-start - A slot for any content before the input. This slot is only available if the type is not email, tel, phone, date, or time
 * @slot input-end - A slot for any content after the input. This slot is only available if the input type is not password
 * @slot hint - Optional text that appears below the field if provided, used to guide the user about the input requirements or expected format
 * @slot error-message - A slot to project a custom error message. If provided, the default error message will be hidden
 * @slot popup - Slot for a popup opening downwards
 *
 * @csspart prefix - Shadow part for the prefix slot
 * @csspart suffix - Shadow part for the suffix slot
 * @csspart input - Shadow part for the text input element
 *
 * @event gup-change - Emitted when value changes
 * @event gup-keydown - Emitted when a key is pressed on the input field
 * @event gup-input - Emitted when value gets changed on input event
 * @event gup-invalid - Emitted on error, contains validity state
 * @event gup-focus - Emitted on input focus
 *
 * @dependency gup-form-hint
 * @dependency gup-form-validation-message
 * @dependency gup-icon
 * @dependency gup-screenreader-text
 */
@customElement('gup-input-field')
export class InputField extends FormControlMixin(GupComponent) {
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static readonly formControlValidators = innerInputValidators;
  private readonly hasSlotController = new HasSlotController(this, 'prefix', 'suffix', 'input-start', 'input-end', 'hint');

  /** If the input is required */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Type of the input. It's used to set `type` attribute of native input inside */
  @property({ reflect: true })
  type: InputFieldType = 'text';

  /** Name of the input – gets submitted with the form data */
  @property()
  name = '';

  /** Default value for the input */
  @property()
  value = '';

  /** Placeholder */
  @property()
  placeholder = '';

  /** Is field disabled or not */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Sets minimum number of characters in the input */
  @property({ type: Number, reflect: true })
  minlength?: number;

  /** Sets maximum number of characters in the input */
  @property({ type: Number, reflect: true })
  maxlength?: number;

  /** Sets minimum acceptable numeric value for the input. Only relevant for `date`, `time`, `number` values of type prop */
  @property({ reflect: true })
  min?: number | string;

  /** Sets maximum acceptable numeric value for the input. Only relevant for `date`, `time`, `number` values of type prop */
  @property({ reflect: true })
  max?: number | string;

  /** Sets a regex pattern for input validation  */
  @property({ type: String, reflect: true })
  pattern?: string;

  /** Sets the increase and decrease step for a `number` input */
  @property({ type: Number, reflect: true })
  step?: number;

  /** If the input label is only accessible by ATs and hidden visually. Note you still must fill the label slot */
  @property({ type: Boolean, reflect: true, attribute: 'label-hidden' }) labelHidden = false;

  /** Custom error message to show when the input is invalid. Default is browser-provided localisation. If you use this prop, your application is responsible for translation */
  @property({ attribute: 'error-message' })
  errorMessage = '';

  /** If input element is readonly. Doesn't affect appearance */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Aria role override for the input element. Used for combobox pattern */
  @property({ attribute: 'input-role' })
  inputRole?: 'combobox' | 'searchbox' | 'textbox';

  /** Id of the popup element controlled by this input (for aria-controls) */
  @property({ attribute: 'aria-controls' })
  ariaControlsId?: string;

  /** Whether the popup is expanded (for aria-expanded) */
  @property({ type: Boolean, attribute: 'aria-expanded' })
  ariaExpandedState?: boolean;

  /** Type of popup (for aria-haspopup) */
  @property({ attribute: 'aria-haspopup' })
  ariaHasPopupType?: 'listbox' | 'menu' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';

  /** ID of the currently active descendant (for aria-activedescendant) */
  @property({ attribute: 'aria-activedescendant' })
  ariaActiveDescendantId?: string;

  /** If the input element is focused */
  @state() public focused = false;
  @state() private dirty = false;
  @state() private passwordVisible = false;
  @state() private submitted = false;
  @state() private interacted = false;

  /** @internal */
  @query('input')
  validationTarget!: HTMLInputElement;

  @watch('value')
  async handleValueChange(): Promise<void> {
    this.setValue(this.value);
    this.dirty = !!this.value;

    await this.validationComplete;

    this.requestUpdate();
  }

  async forceCustomError() {
    await this.updateComplete;
    this.validationTarget.setCustomValidity(this.errorMessage || 'An error occurred');
    this.setValue(this.value);
    this.reportValidity();
  }

  async clearCustomError() {
    await this.updateComplete;
    this.validationTarget.setCustomValidity('');
    this.setValue(this.value);
    this.reportValidity();
  }

  private handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.interacted = true;
    this.value = value;
    this.onInput(value);
  }

  private handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.interacted = true;
    this.value = value;
    this.onChange(value);
  }

  private handleKeydown(event: Event) {
    this.onKeydown(event);
  }

  private handleFocus(event: Event) {
    this.focused = true;
    this.onFocus(event);
    if (this.type === 'date' || this.type === 'time') {
      this.showPicker();
    }
  }

  private handleBlur() {
    this.focused = false;
    this.interacted = true;
  }

  /** Focuses the input programmatically */
  public focus() {
    this.focusInput();
  }

  /** Shows the native HTML picker (eg date or time popup) */
  public showPicker(): void {
    if ('showPicker' in HTMLInputElement.prototype) {
      this.validationTarget.showPicker();
    }
  }

  @event('gup-change') private onChange!: EventDispatcher<string>;

  @event('gup-keydown') private onKeydown!: EventDispatcher<Event>;

  @event('gup-input') private onInput!: EventDispatcher<string>;

  @event('gup-invalid') private onInvalid!: EventDispatcher<ValidityState>;

  @event('gup-focus') private onFocus!: EventDispatcher<Event>;

  connectedCallback() {
    super.connectedCallback();
    this.internals.form?.addEventListener('submit', () => {
      this.submitted = true;
      this.reportValidity();
    });
  }

  firstUpdated() {
    this.setValue(this.value);
  }

  /* updated(changedValues: Map<string, unknown>): void {
    if (changedValues.has('value')) {
      this.setValue(this.value);
    }
  } */

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

  focusInput(): void {
    this.validationTarget.focus();
  }

  private textVisibilityToggle() {
    this.passwordVisible = !this.passwordVisible;
  }

  renderIconButton(iconName: GupIconName, buttonLabel: string): TemplateResult {
    return html`<button aria-label="${buttonLabel}" @click="${this.focusInput}" ?disabled="${this.disabled}"><gup-icon icon-name="${iconName}" height="24" width="24"></gup-icon></button>`;
  }

  renderIcon(iconName: GupIconName): TemplateResult {
    return html`<gup-icon icon-name="${iconName}" height="24" width="24"></gup-icon>`;
  }

  renderInputStart(): TemplateResult {
    if (this.type === 'email') {
      return this.renderIcon('mail');
    } else if (this.type === 'tel') {
      return this.renderIcon('phone');
    } else if (this.type === 'date') {
      return this.renderIconButton('calendar-today', 'Click to pick a date');
    } else if (this.type === 'time') {
      return this.renderIconButton('schedule', 'Click to pick time');
    } else {
      return html`<slot name="input-start"></slot>`;
    }
  }

  renderInputEnd(): TemplateResult {
    if (this.type === 'password') {
      const buttonLabel = this.passwordVisible ? 'Click to hide password' : 'Click to show password';
      return html`
        <button title="${buttonLabel}" aria-label="${buttonLabel}" @click="${this.textVisibilityToggle}" ?disabled="${this.disabled}">
          <gup-icon icon-name="${this.passwordVisible ? 'visibility-off' : 'visibility'}" height="24" width="24"></gup-icon>
        </button>`;
    } else {
      return html`<slot name="input-end"></slot>`;
    }
  }

  renderPrefix(): TemplateResult {
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div class="prefix" part="prefix" @click="${this.focusInput}">
        <slot name="prefix"></slot>
      </div>
    `;
    /* eslint-enable */
  }

  renderSuffix(): TemplateResult {
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div class="suffix" part="suffix" @click="${this.focusInput}">
        <slot name="suffix"></slot>
      </div>
    `;
    /* eslint-enable */
  }

  renderInvalidMessage(): TemplateResult {
    return !this.checkValidity() && (this.interacted || this.submitted)
      ? html`<gup-form-validation-message class="validation-message" id="error-message">
        ${this.validationMessage}
        </gup-form-validation-message>`
      : html``;
  }

  render(): TemplateResult {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let inputType: any = this.type;
    if (this.type === 'password') {
      inputType = this.passwordVisible ? 'text' : 'password';
    }
    if (this.type === 'numeric') {
      inputType = 'text';
    }
    return html`
      <div class="${classMap({
        'host-inner': true,
        'has-hint': this.hasSlotController.test('hint'),
        'has-prefix': this.hasSlotController.test('prefix'),
        'has-suffix': this.hasSlotController.test('suffix'),
        'has-input-start':
          this.hasSlotController.test('input-start') || this.type === 'email' || this.type === 'tel' || this.type === 'date' || this.type === 'time',
        'has-input-end': this.hasSlotController.test('input-end') || this.type === 'password',
        'invalid': !this.checkValidity() && (this.interacted || this.submitted),
        'required': this.required,
        'focused': this.focused,
        'dirty': this.dirty,
      })}">
        <label class="label" for="input">${this.labelHidden ? html`<gup-screenreader-text><slot></slot></gup-screenreader-text>` : html`<slot></slot>`}</label>
        <slot name="error-message">
          ${this.renderInvalidMessage()}
        </slot>
        <div class="field-wrapper">
          <div class="field-inner-wrapper">
            ${this.renderPrefix()}
            <div class="input-wrapper">
              <div class="input-start">
                ${this.renderInputStart()}
              </div>
              <input
                aria-describedby="${getAriaDescribedBy(this.hasSlotController.test('hint'), !this.checkValidity())}"
                aria-invalid="${this.checkValidity() ? 'false' : 'true'}"
                role="${ifDefined(this.inputRole)}"
                aria-controls="${ifDefined(this.ariaControlsId)}"
                aria-expanded="${ifDefined(this.ariaExpandedState !== undefined ? (this.ariaExpandedState ? 'true' : 'false') : undefined)}"
                aria-haspopup="${ifDefined(this.ariaHasPopupType)}"
                aria-activedescendant="${ifDefined(this.ariaActiveDescendantId)}"
                id="input"
                class="input"
                name="${this.name}"
                ?readonly="${this.readonly}"
                inputmode="${ifDefined(this.type === 'numeric' ? 'numeric' : undefined)}"
                type="${inputType}"
                pattern="${ifDefined(this.pattern ? this.pattern : this.type === 'numeric' ? '[0-9]*' : undefined)}"
                minlength="${ifDefined(this.minlength)}"
                maxlength="${ifDefined(this.maxlength)}"
                min="${ifDefined(this.min)}"
                max="${ifDefined(this.max)}"
                step="${ifDefined(this.step)}"
                placeholder="${ifDefined(this.placeholder)}"
                @keydown="${this.handleKeydown}"
                @change="${this.handleChange}"
                @input="${this.handleInput}"
                @focus="${this.handleFocus}"
                @blur="${this.handleBlur}"
                ?required=${this.required}
                ?disabled=${this.disabled}
                .value="${live(this.value)}"
                part="input"
              >
              <div class="input-end">
                ${this.renderInputEnd()}
              </div>
            </div>
            ${this.renderSuffix()}
          </div>
        </div>
        <slot name="popup"></slot>
        <gup-form-hint class="hint" id="hint"><slot name="hint"></slot></gup-form-hint>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
