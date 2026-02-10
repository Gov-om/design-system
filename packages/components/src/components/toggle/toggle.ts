import { TemplateResult, html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { FormControlMixin } from '@open-wc/form-control';
import { GupComponent } from '../../styles/styles';
import styles from './toggle.css?inline';
import { EventDispatcher, event } from '../../utils/decorators/event';
import { innerInputValidators } from '../../utils/form-validators';
import { HasSlotController } from '../../utils/slot-controller';
import '../form-hint/form-hint';

/**
 *  A form-based switch control
 *
 * @slot - Label text. Use [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). Avoid interactive content like links or buttons
 * @slot hint - Optional text that appears below the field if provided, used to guide the user about the input requirements or expected format
 *
 * @event gup-change - Fires whenever user toggles the switch
 *
 * @dependency gup-form-hint
 */
@customElement('gup-toggle')
export class Toggle extends FormControlMixin(GupComponent) {
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static readonly formControlValidators = innerInputValidators;

  /** A name of the toggle in an HTML form. Must be unique */
  @property() name = '';

  /** Sets the checked state for switch */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Sets the disabled state for switch */
  @property({ type: Boolean, reflect: true }) disabled? = false;

  /** A boolean indicating whether the toggle is readonly */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Render the knob before the text or after */
  @property({ reflect: true, attribute: 'knob-location' }) knobLocation: 'before' | 'after' = 'before';

  @event('gup-change') private onChange!: EventDispatcher<boolean>;

  private readonly hasSlotController = new HasSlotController(this, 'hint');

  toggle(event: Event) {
    if (this.disabled) return;

    const value = (event.target as HTMLInputElement).checked;

    this.checked = value;
    this.onChange(this.checked);
  }

  private renderHint(): TemplateResult | typeof nothing {
    return this.hasSlotController.test('hint') ? html`<gup-form-hint class="hint" id="hint"><slot name="hint"></slot></gup-form-hint>` : nothing;
  }

  private renderText(): TemplateResult {
    return html`
      <div class="text-container">
        <slot></slot>
        ${this.renderHint()}
      </div>
    `;
  }

  private handleChange(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked;
  }

  render() {
    return html`
      <label class="track">
        ${when(this.knobLocation === 'after', () => this.renderText())}
        <input
          class="native-input"
          type="checkbox"
          name="${this.name}"
          aria-describedby="hint"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @click=${this.toggle}
          ?readonly="${this.readonly}"
          @change=${this.handleChange}
        >
        <div class="box">
          <div class="knob"></div>
        </div>
        ${when(this.knobLocation === 'before', () => this.renderText())}
      </label>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
