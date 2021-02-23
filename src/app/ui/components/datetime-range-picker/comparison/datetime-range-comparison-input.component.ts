import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { DatetimeRange } from '../input/datetime-range-selection-model';
import { DatetimeRangePickerTarget } from '../picker/datetime-range-picker-content.component';

export interface DatetimeRangeComparisonInputValueChange {
    index: number;
    value: DatetimeRange;
}

@Component({
    selector: 'app-datetime-range-comparison-input',
    templateUrl: './datetime-range-comparison-input.component.html',
    styleUrls: ['./datetime-range-comparison-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimeRangeComparisonInputComponent {
    @Input()
    min: Date | null = null;

    @Input()
    max: Date | null = null;

    _secondRangeEnabled = false;

    _addRangeDisabled = true;

    targetRange: DatetimeRangePickerTarget | null = null;

    @Output()
    valueChange = new EventEmitter<DatetimeRangeComparisonInputValueChange>();

    @Output() rangeRemoveChange = new EventEmitter<void>();

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    _handleRangeSelected(r: 1 | 2, value: DatetimeRange): void {
        this._addRangeDisabled = false;
        this.valueChange.next({
            index: r - 1,
            value: value
        });
        this._changeDetectorRef.markForCheck();
    }

    addRange(): void {
        this._secondRangeEnabled = true;
        this._changeDetectorRef.markForCheck();
        this.valueChange.next({
            index: 1,
            value: new DatetimeRange(null, null)
        });
    }

    removeRange(): void {
        this._secondRangeEnabled = false;
        this._changeDetectorRef.markForCheck();
        this.rangeRemoveChange.next();
    }
}
