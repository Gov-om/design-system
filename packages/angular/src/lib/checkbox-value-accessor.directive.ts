import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector:
    'gup-checkbox[formControlName], gup-checkbox[formControl], gup-checkbox[ngModel], gup-toggle[formControlName], gup-toggle[formControl], gup-toggle[ngModel]',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GupCheckboxValueAccessor),
      multi: true,
    },
  ],
})
export class GupCheckboxValueAccessor implements ControlValueAccessor {
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private hostElement: ElementRef) {}

  writeValue(value: boolean): void {
    this.hostElement.nativeElement.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.hostElement.nativeElement.disabled = isDisabled;
  }

  @HostListener('gup-change', ['$event.detail'])
  handleCheckboxChange(checked: boolean) {
    this.onChange(checked);
    this.onTouched();
  }
}
