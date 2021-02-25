import { FactoryProvider, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class DatetimeRange {
    constructor(readonly start: Date | null, readonly end: Date | null) {}

    static fromInterval(interval: Interval): DatetimeRange {
        const s = interval.start;
        const e = interval.end;
        if (!(s instanceof Date || s === -Infinity)) {
            throw new Error('start must be Date or -Infinity');
        }
        if (!(e instanceof Date || e === Infinity)) {
            throw new Error('end must be Date of Infinity');
        }
        return new DatetimeRange(
            s === -Infinity ? null : (s as Date),
            e === Infinity ? null : (e as Date)
        );
    }

    toInterval(): Interval {
        return {
            start: this.start ?? -Infinity,
            end: this.end ?? Infinity
        };
    }
}

export interface DatetimeRangeSelectionModelChange {
    selection: DatetimeRange;

    source: unknown;
}

@Injectable()
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
        new DatetimeRangeSelectionModel(new DatetimeRange(null, null))
};
