import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'gup-file-upload[formControlName], gup-file-upload[formControl], gup-file-upload[ngModel]',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GupFileUploadValueAccessor),
      multi: true,
    },
  ],
})
export class GupFileUploadValueAccessor implements ControlValueAccessor {
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

  @HostListener('gup-change', ['$event.detail'])
  handleValueChange(newValue: any) {
    this.onChange(newValue);
    this.onTouched();
  }
}
