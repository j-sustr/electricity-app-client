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
export class DatetimeRangeComparisonInputComponent implements OnInit {
    @Input()
    get min(): Date | null {
        return this._min;
    }
    set min(value: Date | null) {
        this._min = value;
    }
    private _min: Date | null = null;

    @Input()
    get max(): Date | null {
        return this._max;
    }
    set max(value: Date | null) {
        this._max = value;
    }
    private _max: Date | null = null;

    ranges: null[] = [];

    @Output()
    valueChange = new EventEmitter<DatetimeRangeComparisonInputValueChange>();

    @Output() rangeRemoveChange = new EventEmitter<void>();

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.ranges.push(null);
        this._changeDetectorRef.markForCheck();
    }

    _handleRangeSelected(index: number, value: DatetimeRange): void {
        this.valueChange.next({
            index: index,
            value: value
        });
    }

    addRange(): void {
        if (this.ranges.length > 1) {
            return;
        }
        this.ranges.push(null);
        this._changeDetectorRef.markForCheck();
        this.valueChange.next({
            index: this.ranges.length - 1,
            value: new DatetimeRange(null, null)
        });
    }

    removeRange(): void {
        if (this.ranges.length < 2) {
            return;
        }
        this.ranges.pop();
        this._changeDetectorRef.markForCheck();
        this.rangeRemoveChange.next();
    }
}
