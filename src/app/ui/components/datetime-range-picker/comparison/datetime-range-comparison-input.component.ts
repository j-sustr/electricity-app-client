import { Component, Input, OnInit } from '@angular/core';
import {
    DatetimeRangeComparison,
    DatetimeRangeComparisonSelectionModel
} from './datetime-range-comparison-selection-model';

@Component({
    selector: 'app-datetime-range-comparison-input',
    templateUrl: './datetime-range-comparison-input.component.html',
    styleUrls: ['./datetime-range-comparison-input.component.scss']
})
export class DatetimeRangeComparisonInputComponent {
    get value(): DatetimeRangeComparison | null {
        return this._model ? this._model.selection : null;
    }

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

    constructor(private _model: DatetimeRangeComparisonSelectionModel) {}

    addRange() {}

    removeRange() {}
}
