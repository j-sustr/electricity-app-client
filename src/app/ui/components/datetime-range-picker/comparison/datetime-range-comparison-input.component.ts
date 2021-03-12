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
import { assertValidInterval } from 'src/app/common/temporal/interval/assert-valid-interval';
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
    set value1(value: DatetimeRange) {
        this.picker1.selectedValue = value;
    }

    get value2(): DatetimeRange | undefined {
        return this.picker2?.selectedValue;
    }
    set value2(value: DatetimeRange | undefined) {
        if (this.picker2 && value) {
            this.picker2.selectedValue = value;
        }
    }

    _lastValue1?: DatetimeRange | null;

    @Input()
    set min(value: Date | null) {
        this._min = value;
        this._changeDetectorRef.detectChanges();
    }
    _min: Date | null = null;

    @Input()
    set max(value: Date | null) {
        this._max = value;
        this._changeDetectorRef.detectChanges();
    }
    _max: Date | null = null;

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
        this._addRangeDisabled = value.start === null || value.end === null;
        this.valueChange.next({
            range1: r === 1 ? value : this.value1,
            range2: r === 2 ? value : this.value2
        });
        this._changeDetectorRef.markForCheck();
    }

    addRange(value?: DatetimeRange): void {
        this._secondRangeEnabled = true;
        this._changeDetectorRef.markForCheck();
        setTimeout(() => {
            if (this.picker2) {
                this.value2 = value ? value : this.value1;
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
): DatetimeRangePickerTarget | null {
    assertValidInterval(interval);
    if (interval.start === -Infinity && interval.end === Infinity) {
        return null;
    }
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
