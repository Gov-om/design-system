import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'gup-radio-button-group[formControlName], gup-radio-button-group[formControl], gup-radio-button-group[ngModel]',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GupRadioValueAccessor),
      multi: true,
    },
  ],
})
export class GupRadioValueAccessor implements ControlValueAccessor {
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private hostElement: ElementRef) {}

  writeValue(value: string | null): void {
    this.hostElement.nativeElement.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.hostElement.nativeElement.setDisabled(isDisabled);
  }

  @HostListener('gup-change', ['$event.detail'])
  handleValueChange(newValue: string) {
    this.onChange(newValue);
    this.onTouched();
  }
}
