import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { DatetimeRangeInputComponent } from './input/datetime-range-input.component';
import { DatetimeRangePickerComponent } from './picker/datetime-range-picker.component';
import { DatetimeRangeComparisonInputComponent } from './comparison/datetime-range-comparison-input.component';
import { CommonModule } from '@angular/common';
import { DatetimeRangePickerContentComponent } from './picker/datetime-range-picker-content.component';
import { DxCalendarModule } from 'devextreme-angular/ui/calendar';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DatetimeRangeComparisonInputContainerComponent } from './comparison-container/datetime-range-comparison-input-container.component';

const DX = [DxCalendarModule, DxButtonModule];
const CDK = [OverlayModule, PortalModule];

const COMPONENTS = [
    DatetimeRangeComparisonInputComponent,
    DatetimeRangeInputComponent,
    DatetimeRangePickerComponent,
    DatetimeRangePickerContentComponent,
    DatetimeRangeComparisonInputContainerComponent
];

@NgModule({
    imports: [CommonModule, ...CDK, ...DX],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: []
})
export class DatetimeRangePickerModule {}
