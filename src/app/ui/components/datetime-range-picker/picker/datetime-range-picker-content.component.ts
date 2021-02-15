import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { startAndDurationToInterval } from 'src/app/common/temporal/temporal-utils';
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

    zoomLevel: CalendarZoomLevel = 'month';

    constructor(private _model: DatetimeRangeSelectionModel) {}

    _startExitAnimation() {
        throw Error('not implemented');
    }

    selectTarget(value: DatetimeRangePickerTarget): void {
        this._setTargetValue(value);
    }

    handleCalendarValueChanged(event: { value: Date }): void {
        this._currentDate = event.value;
        this._handleUserSelection();
    }

    handleCalendarOptionChanged(event: { name: string; value: unknown }): void {
        if (event.name === 'currentDate') {
            this._currentDate = event.value as Date;
        } else if (event.name === 'zoomLevel') {
            const zoomLevel = event.value as CalendarZoomLevel;
            this.zoomLevel = zoomLevel;
            if (this._targetZoomLevel === this.zoomLevel) {
                this._handleUserSelection();
            }
        }
    }

    private _handleUserSelection() {
        if (!this._currentDate) {
            throw new Error('currentDate is not set');
        }
        const interval = startAndDurationToInterval(
            this._currentDate,
            this._getSelectedDuration()
        );
        this._model.updateSelection(DatetimeRange.fromInterval(interval), this);
        this.picker?.close();
    }

    private _setTargetValue(target: DatetimeRangePickerTarget) {
        this.zoomLevel = 'decade';
        this.target = target;
        this.step = 'select-range';
        switch (target) {
            case 'year':
                this._targetZoomLevel = 'year';
                break;
            case 'month':
                this._targetZoomLevel = 'month';
                break;
            case 'day':
                this._targetZoomLevel = undefined;
                break;
            default:
                break;
        }
    }

    private _getSelectedDuration(): Duration {
        switch (this.target) {
            case 'year':
                return {
                    years: 1
                };
            case 'month':
                return {
                    months: 1
                };
            case 'day':
                return {
                    days: 1
                };
            default:
                throw new Error('no duration selected');
        }
    }
}
