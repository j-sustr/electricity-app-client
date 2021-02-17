import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-datetime-range-comparison-input',
    templateUrl: './datetime-range-comparison-input.component.html',
    styleUrls: ['./datetime-range-comparison-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class DatetimeRangeComparisonInputComponent {
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

    ranges = [];

    constructor() {}

    addRange() {}

    removeRange() {}
}
