import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class DatetimeRange {
    constructor(readonly start: Date | null, readonly end: Date | null) {}
}

export interface DatetimeRangeSelectionModelChange {
    selection: DatetimeRange;

    source: unknown;
}

export class DatetimeRangeSelectionModel implements OnDestroy {
    private _selectionChanged = new Subject<DatetimeRangeSelectionModelChange>();

    selectionChanged: Observable<DatetimeRangeSelectionModelChange> = this
        ._selectionChanged;

    constructor(readonly selection: DatetimeRange) {
        this.selection = selection;
    }

    updateSelection(value: DatetimeRange, source: unknown): void {
        (this as { selection: DatetimeRange }).selection = value;
        this._selectionChanged.next({ selection: value, source });
    }

    ngOnDestroy(): void {
        this._selectionChanged.complete();
    }
}
