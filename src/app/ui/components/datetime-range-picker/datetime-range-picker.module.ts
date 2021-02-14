import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { DatetimeRangeInputComponent } from './input/datetime-range-input.component';
import { DatetimeRangePickerComponent } from './picker/datetime-range-picker.component';
import { DatetimeRangeComparisonInputComponent } from './comparison/datetime-range-comparison-input.component';
import { CommonModule } from '@angular/common';

const CDK = [OverlayModule, PortalModule];

@NgModule({
    imports: [CommonModule, ...CDK],
    exports: [
        DatetimeRangeComparisonInputComponent,
        DatetimeRangeInputComponent,
        DatetimeRangePickerComponent
    ],
    declarations: [
        DatetimeRangeComparisonInputComponent,
        DatetimeRangeInputComponent,
        DatetimeRangePickerComponent
    ],
    providers: []
})
export class DatetimeRangePickerModule {}
