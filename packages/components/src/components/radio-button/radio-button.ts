// inspired by https://github.com/Trendyol/baklava/blob/next/src/components/radio-group/radio/bl-radio.ts
import { TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './radio-button.css?inline';
import { EventDispatcher, event } from '../../utils/decorators/event';
import { RadioButtonGroup } from '../radio-button-group/radio-button-group';
import { HasSlotController } from '../../utils/slot-controller';
import '../form-hint/form-hint.ts';

/**
 * A radio button allows users to select one option from a list of predefined choices. Only to be used inside of a `gup-radio-button-group`.
 *
 * @slot - Label text. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive content like links or buttons
 * @slot hint - Optional text that appears below the radio button
 *
 * @event gup-change - Fires whenever user change the value of the radio
 * @event gup-focus - Fires whenever user focus on the radio button
 * @event gup-blur - Fires whenever the radio button loses focus
 *
 * @dependency gup-form-hint
 */
@customElement('gup-radio-button')
export class RadioButton extends GupComponent {
  /** The name of the radio button. Should be the same for all radio buttons in a group */
  @property() name!: string;

  /** The value of the radio button. Will be returned when a form is submitted */
  @property() value!: string;

  /** The size of the radio button */
  @property() size: 's' | 'm' = 'm';

  /** Sets the checked state for checkbox */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Sets checkbox as required */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Sets the disabled state for radio button */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @event('gup-change') private emitChange!: EventDispatcher<string>;

  @event('gup-focus') private emitFocus!: EventDispatcher<string>;

  @event('gup-blur') private emitBlur!: EventDispatcher<string>;

  private readonly hasSlotController = new HasSlotController(this, 'hint');

  handleChange() {
    if (this.disabled) {
      return;
    }

    this.selected = true;
    this.emitChange(this.value);
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleChange();
    }
  }

  @query('[role="radio"]') private radioElement!: HTMLElement;

  private sizeMap = {
    s: { boxSize: 'var(--gup-icon-md)', pupilSize: 'var(--gup-icon-xs)' },
    m: { boxSize: 'var(--gup-icon-xl)', pupilSize: 'var(--gup-icon-sm)' },
  };

  /** Returns the checked state of the radio button */
  public get checked(): boolean {
    return this.selected;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('size')) {
      const { boxSize, pupilSize } = this.sizeMap[this.size];
      this.style.setProperty('--box-size', `${boxSize}`);
      this.style.setProperty('--pupil-size', `${pupilSize}`);
    }
  }

  private handleFieldValueChange = (event: CustomEvent<string>) => {
    const newValue = event.detail;

    this.selected = newValue === this.value;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private field: any;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<RadioButtonGroup>('gup-radio-button-group');

    if (!this.field) {
      console.warn('gup-radio-button is designed to be used inside of a gup-radio-button-group', this);
    }

    this.field?.addEventListener('gup-change', this.handleFieldValueChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener('gup-change', this.handleFieldValueChange);
  }

  private renderHint(): TemplateResult | typeof nothing {
    return this.hasSlotController.test('hint') ? html`<gup-form-hint class="hint" id="hint"><slot name="hint"></slot></gup-form-hint>` : nothing;
  }

  /** Focuses the radio button */
  public focus(): void {
    this.radioElement.tabIndex = 0;
    this.radioElement.focus();
    this.emitFocus(this.value);
  }

  private handleBlur() {
    this.radioElement.tabIndex = -1;
    this.emitBlur(this.value);
  }

  render() {
    return html`
      <div class="wrapper" @keydown=${this.handleKeydown} aria-labelledby="label"
      aria-disabled=${this.disabled} @click=${this.handleChange} role="radio" aria-checked=${this.selected} @blur=${this.handleBlur}>
        <div class="box">
          <div class="box-inner">
            <div class="box-pupil"></div>
          </div>
        </div>
        <div class="labels">
          <div class="label" id="label"><slot></slot></div>
          ${this.renderHint()}
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
