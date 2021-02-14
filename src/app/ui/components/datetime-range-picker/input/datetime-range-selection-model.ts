import { Directive, FactoryProvider, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class DatetimeRange {
    constructor(readonly start: Date | null, readonly end: Date | null) {}
}

export interface DatetimeRangeSelectionModelChange {
    selection: DatetimeRange;

    source: unknown;
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
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

export const DATETIME_RANGE_SELECTION_MODEL_PROVIDER: FactoryProvider = {
    provide: DatetimeRangeSelectionModel,
    useFactory: () =>
        new DatetimeRangeSelectionModel({
            start: null,
            end: null
        })
};
