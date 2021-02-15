import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DatetimeRangeSelectionModel } from '../input/datetime-range-selection-model';
import { DatetimeRangePickerComponent } from './datetime-range-picker.component';

export const targetOptions = ['year', 'month', 'day', 'hour'] as const;
export type DatetimeRangePickerTarget = typeof targetOptions[number];

export const stepOptions = ['select-target', 'select-value'] as const;
export type DatetimeRangePickerStep = typeof stepOptions[number];

@Component({
    selector: 'app-daterange-picker-content',
    templateUrl: 'datetime-range-picker-content.component.html',
    styleUrls: ['datetime-range-picker-content.component.scss'],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'datetime-range-picker-content'
    }
})
export class DatetimeRangePickerContentComponent {
    picker?: DatetimeRangePickerComponent;

    _animationDone = new Subject<void>();

    step: DatetimeRangePickerStep = 'select-target';

    target: DatetimeRangePickerTarget | null = null;

    constructor(private _model: DatetimeRangeSelectionModel) {}

    selectTarget(value: DatetimeRangePickerTarget): void {
        this.target = value;
        this.step = 'select-value';
    }

    selectYear() {}

    selectMonth() {}

    selectDay() {}

    _startExitAnimation() {
        throw Error('not implemented');
    }
}
