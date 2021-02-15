import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import {
    DatetimeRange,
    DatetimeRangeSelectionModel
} from '../input/datetime-range-selection-model';
import { DatetimeRangePickerComponent } from './datetime-range-picker.component';

export const targetOptions = ['year', 'month', 'day', 'hour'] as const;
export type DatetimeRangePickerTarget = typeof targetOptions[number];

export const stepOptions = [
    'select-target',
    'select-range',
    'select-hour'
] as const;
export type DatetimeRangePickerStep = typeof stepOptions[number];

type CalendarZoomLevel = 'month' | 'year' | 'decade' | 'century';

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
    private _targetZoomLevel?: CalendarZoomLevel = 'month';

    private _currentDate?: Date;

    _animationDone = new Subject<void>();

    picker?: DatetimeRangePickerComponent;

    step: DatetimeRangePickerStep = 'select-target';

    target: DatetimeRangePickerTarget | null = null;

    min?: Date;
    max?: Date;

    zoomLevel: CalendarZoomLevel = 'month';

    constructor(private _model: DatetimeRangeSelectionModel) {}

    _startExitAnimation() {
        throw Error('not implemented');
    }

    selectTarget(value: DatetimeRangePickerTarget): void {
        this._setTargetValue(value);
    }

    handleCalendarValueChanged(event: { value: Date }): void {
        console.log('valueChanged', event);
    }

    handleCalendarOptionChanged(event: { name: string; value: unknown }): void {
        if (event.name === 'currentDate') {
            this._currentDate = event.value as Date;
        } else if (event.name === 'zoomLevel') {
            const zoomLevel = event.value as CalendarZoomLevel;
            this.zoomLevel = zoomLevel;
            if (this._targetZoomLevel === this.zoomLevel) {
                const duration = this._getSelectedDuration();
                console.log(event.value);
            }
        }
    }

    private _setTargetValue(target: DatetimeRangePickerTarget) {
        this.zoomLevel = 'decade';
        this.target = target;
        this.step = 'select-range';
        switch (target) {
            case 'year':
                this._targetZoomLevel = 'decade';
                break;
            case 'month':
                this._targetZoomLevel = 'year';
                break;
            case 'day':
                this._targetZoomLevel = 'month';
                break;
            default:
                break;
        }
    }

    private _getSelectedDuration() {
        switch (this.target) {
            case 'year':
                break;
            case 'month':
                break;
            case 'day':
                break;
            default:
                break;
        }
    }
}
