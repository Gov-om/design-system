import { NgModule } from '@angular/core';
import { GupDropdownFieldValueAccessor } from './dropdown-field-value-accessor.directive';
import { GupCheckboxValueAccessor } from './checkbox-value-accessor.directive';
import { GupFileUploadValueAccessor } from './file-upload-value-accessor.directive';
import { GupRadioValueAccessor } from './radio-value-accessor.directive';

@NgModule({
  declarations: [GupDropdownFieldValueAccessor, GupCheckboxValueAccessor, GupRadioValueAccessor, GupFileUploadValueAccessor],
  exports: [GupDropdownFieldValueAccessor, GupCheckboxValueAccessor, GupRadioValueAccessor, GupFileUploadValueAccessor],
})
export class GupFormsCompatModule {}
