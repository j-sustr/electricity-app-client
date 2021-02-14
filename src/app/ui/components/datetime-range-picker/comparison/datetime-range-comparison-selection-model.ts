import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class DatetimeRange {
    constructor(readonly start: Date | null, readonly end: Date | null) {}
}

export class DatetimeRangeComparison {
    constructor(readonly ranges: DatetimeRange[]) {}
}

export interface DatetimeRangeComparisonSelectionModelChange {
    selection: DatetimeRangeComparison;

    source: unknown;
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DatetimeRangeComparisonSelectionModel implements OnDestroy {
    private _selectionChanged = new Subject<DatetimeRangeComparisonSelectionModelChange>();

    selectionChanged: Observable<DatetimeRangeComparisonSelectionModelChange> = this
        ._selectionChanged;

    constructor(readonly selection: DatetimeRangeComparison) {
        this.selection = selection;
    }

    updateSelection(value: DatetimeRangeComparison, source: unknown): void {
        (this as { selection: DatetimeRangeComparison }).selection = value;
        this._selectionChanged.next({ selection: value, source });
    }

    ngOnDestroy(): void {
        this._selectionChanged.complete();
    }
}
