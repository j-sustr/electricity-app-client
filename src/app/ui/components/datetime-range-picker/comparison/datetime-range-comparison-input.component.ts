import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit
} from '@angular/core';

export type RangeItem = {
    min: Date | null;
    max: Date | null;
};

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

    ranges: RangeItem[] = [];

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.ranges.push({
            min: null,
            max: null
        });
        this._changeDetectorRef.markForCheck();
    }

    addRange(): void {
        if (this.ranges.length > 1) {
            return;
        }
        this.ranges.push({
            min: null,
            max: null
        });
        this._changeDetectorRef.markForCheck();
    }

    removeRange(): void {
        if (this.ranges.length < 2) {
            return;
        }
        this.ranges.pop();
        this._changeDetectorRef.markForCheck();
    }
}
