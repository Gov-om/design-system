// inspired by https://github.com/Trendyol/baklava/blob/next/src/components/radio-group/bl-radio-group.ts
import { TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FormControlMixin, requiredValidator } from '@open-wc/form-control';
import { GupComponent } from '../../styles/styles';
import styles from './radio-button-group.css?inline';
import { getAriaDescribedBy, isEmpty } from '../../utils/helpers';
import { EventDispatcher, event } from '../../utils/decorators/event';
import { HasSlotController } from '../../utils/slot-controller';
import { type RadioButton } from '../radio-button/radio-button';
import '../track/track';
import '../form-hint/form-hint';
import '../form-validation-message/form-validation-message';

/**
 * A radio group allows users to select an option from a list of predefined choices.
 *
 * @slot - only `gup-radio-button` elements
 * @slot hint - Optional text that appears below the radio button group if provided, used to guide the user about the input requirements or expected format
 *
 * @event gup-change - Emitted when value changes
 * @event gup-invalid - Emitted on error, contains validity state
 *
 * @dependency gup-track
 * @dependency gup-form-hint
 * @dependency gup-form-validation-message
 */
@customElement('gup-radio-button-group')
export class RadioButtonGroup extends FormControlMixin(GupComponent) {
  /** Group label */
  @property() label = '';

  /** Selected value */
  @property({ type: String, reflect: true }) value = '';

  /** Selected value */
  @property({ type: String, reflect: true }) name = '';

  /** If the radio button group is required */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Custom error message to show when the radio is invalid. Default is browser-provided localisation. If you use this prop, your application is responsible for translation */
  @property({ attribute: 'error-message' }) errorMessage = '';

  /** Fires whenever user change the value of the radio group */
  @event('gup-change') private onChange!: EventDispatcher<string>;

  @event('gup-invalid') private onInvalid!: EventDispatcher<ValidityState>;

  /** @internal */
  @query('.validation-target') validationTarget!: HTMLInputElement;

  static readonly formControlValidators = [requiredValidator];
  private readonly hasSlotController = new HasSlotController(this, 'hint');

  constructor() {
    super();

    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /** Gets all radio options (items) */
  public get options(): RadioButton[] {
    const opts: Element[] = [...this.querySelectorAll('gup-radio-button')];
    return opts as RadioButton[];
  }

  /** Gets radio options (items) available for interaction */
  public get availableOptions(): RadioButton[] {
    return this.options.filter((option) => !option.disabled);
  }

  /** @internal */
  @state() private focusedOptionIndex: number = 0;

  private handleKeyDown(event: KeyboardEvent): void {
    // Next option
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      this.focusedOptionIndex = this.focusedOptionIndex + 1;

      // Previous option
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      this.focusedOptionIndex = this.focusedOptionIndex - 1;
      // Select option
    } else if ([' '].includes(event.key)) {
      this.availableOptions[this.focusedOptionIndex].handleChange();
      return;
    } else {
      // Other keys are not our interest here
      return;
    }

    // Don't exceed array indexes
    this.focusedOptionIndex = Math.max(0, Math.min(this.focusedOptionIndex, this.availableOptions.length - 1));

    this.availableOptions[this.focusedOptionIndex].focus();

    event.preventDefault();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value')) {
      this.setValue(this.value);
      this.onChange(this.value);
    }
  }

  validityCallback(): string | void {
    this.onInvalid(this.internals.validity);
    return this.errorMessage || this.validationTarget?.validationMessage;
  }

  /** Disables all radio options */
  public setDisabled(isDisabled: boolean): void {
    this.options.forEach((option) => {
      option.disabled = isDisabled;
    });
  }

  private handleOptionChecked(event: CustomEvent) {
    const checkedOption = event.target as RadioButton;
    const checkedOptionIndex = this.availableOptions.indexOf(checkedOption);

    this.focusedOptionIndex = checkedOptionIndex;
    this.handleFocus();

    this.setValue(checkedOption.value);
    this.value = checkedOption.value;
    this.onChange(checkedOption.value);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.setValue(this.value);

    const defaultOptionIdx = this.availableOptions.findIndex((option) => option.getAttribute('value') === this.value);
    if (defaultOptionIdx !== -1) {
      this.availableOptions[defaultOptionIdx].selected = true;
    }

    this.tabIndex = 0;
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('keydown', this.handleKeyDown);
    this.internals.form?.addEventListener('submit', (e: SubmitEvent) => this.handleSubmit(e));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.internals.form?.removeEventListener('submit', (e: SubmitEvent) => this.handleSubmit(e));
  }

  private handleSubmit(e: SubmitEvent) {
    if (!this.checkValidity()) {
      this.onInvalid(this.internals.validity);
      e.preventDefault();
    }
  }

  private handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus();
  }

  private renderErrorMessage(): TemplateResult {
    return !isEmpty(this.validationMessage)
      ? html`
        <gup-form-validation-message class="error" id="error-message">
          ${this.validationMessage}
        </gup-form-validation-message>`
      : html``;
  }

  private renderHint(): TemplateResult | typeof nothing {
    return this.hasSlotController.test('hint') ? html`<gup-form-hint class="hint" id="hint"><slot name="hint"></slot></gup-form-hint>` : nothing;
  }

  render() {
    return html`
      <fieldset aria-describedby=${getAriaDescribedBy(this.hasSlotController.test('hint'), !this.checkValidity())} @gup-change=${this.handleOptionChecked}>
        <legend class="${classMap({
          'label': true,
          'has-error': !this.checkValidity(),
        })}">
          ${this.label}
        </legend>
        ${this.renderErrorMessage()}
        <gup-track direction="vertical" gap="3">
          <slot></slot>
        </gup-track>
        ${this.renderHint()}
      </fieldset>
      <input
        type="text"
        class="validation-target"
        ?required=${this.required}
        tabindex="-1"
        hidden
      />
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
