import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownMenuItemData } from '@gup-ds/components';

@Directive({
  selector: 'gup-dropdown-field[formControlName], gup-dropdown-field[formControl], gup-dropdown-field[ngModel]',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GupDropdownFieldValueAccessor),
      multi: true,
    },
  ],
})
export class GupDropdownFieldValueAccessor implements ControlValueAccessor {
  constructor(private hostElement: ElementRef) {}

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    this.hostElement.nativeElement.value = value;
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.hostElement.nativeElement.disabled = isDisabled;
  }

  @HostListener('gup-value-change', ['$event.detail'])
  handleDropdownValue(newValue: DropdownMenuItemData[]) {
    if (this.hostElement.nativeElement.isMultiple()) {
      this.onChange(newValue.map((item) => item.value));
    } else {
      this.onChange([newValue[0].value]);
    }
    this.onTouched();
  }
}
