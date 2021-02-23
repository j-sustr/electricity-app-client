import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { intervalToDuration } from 'date-fns';
import { intervalsHaveEqualDuration } from 'src/app/common/temporal/interval/intervals-have-equal-duration';
import { DatetimeRange } from '../input/datetime-range-selection-model';
import { DatetimeRangePickerTarget } from '../picker/datetime-range-picker-content.component';
import { DatetimeRangePickerComponent } from '../picker/datetime-range-picker.component';

export interface DatetimeRangeComparisonInputValueChange {
    range1: DatetimeRange;
    range2?: DatetimeRange;
}

@Component({
    selector: 'app-datetime-range-comparison-input',
    templateUrl: './datetime-range-comparison-input.component.html',
    styleUrls: ['./datetime-range-comparison-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimeRangeComparisonInputComponent {
    get value1(): DatetimeRange {
        return this.picker1.selectedValue;
    }

    get value2(): DatetimeRange | undefined {
        return this.picker2?.selectedValue;
    }

    _lastValue1?: DatetimeRange | null;

    @Input()
    min: Date | null = null;

    @Input()
    max: Date | null = null;

    _secondRangeEnabled = false;

    _addRangeDisabled = true;

    targetRange: DatetimeRangePickerTarget | null = null;

    @Output()
    valueChange = new EventEmitter<DatetimeRangeComparisonInputValueChange>();

    @ViewChild('rangePicker1') picker1!: DatetimeRangePickerComponent;

    @ViewChild('rangePicker2') picker2?: DatetimeRangePickerComponent;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    _handleRangeSelected(r: 1 | 2, value: DatetimeRange): void {
        if (r === 1) {
            if (this._secondRangeEnabled && !this._isEqualToLastValue1(value)) {
                this.removeRange();
                this._lastValue1 = value;
                return;
            }
            this._lastValue1 = value;
            this._setRange2Target();
        }
        this._addRangeDisabled = false;
        this.valueChange.next({
            range1: r === 1 ? value : this.value1,
            range2: r === 2 ? value : this.value2
        });
        this._changeDetectorRef.markForCheck();
    }

    addRange(): void {
        this._secondRangeEnabled = true;
        this._changeDetectorRef.markForCheck();
        setTimeout(() => {
            if (this.picker2) {
                this.picker2.selectedValue = this.picker1.selectedValue;
                this.valueChange.next({
                    range1: this.value1,
                    range2: this.value2
                });
            }
        }, 0);
    }

    removeRange(): void {
        this._secondRangeEnabled = false;
        this._changeDetectorRef.markForCheck();
        this.valueChange.next({
            range1: this.value1
        });
    }

    _isEqualToLastValue1(value: DatetimeRange): boolean {
        if (!this._lastValue1) {
            return false;
        }

        return intervalsHaveEqualDuration(
            this._lastValue1.toInterval(),
            value.toInterval()
        );
    }

    _setRange2Target(): void {
        const interval = this._lastValue1?.toInterval();
        if (!interval) {
            throw new Error('lastValue1 is not set');
        }
        this.targetRange = intervalToDatetimeRangePickerTarget(interval);
    }
}

function intervalToDatetimeRangePickerTarget(
    interval: Interval
): DatetimeRangePickerTarget {
    const d = intervalToDuration(interval);
    switch (true) {
        case d.years === 1:
            return 'year';
        case d.months === 1:
            return 'month';
        case d.days === 1:
            return 'day';
        case d.hours === 1:
            return 'hour';
    }

    throw new Error('invalid interval');
}
