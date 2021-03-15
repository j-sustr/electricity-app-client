import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
    DatetimeRange,
    DatetimeRangeSelectionModel
} from './datetime-range-selection-model';
import { DatetimeRangePickerComponent } from '../picker/datetime-range-picker.component';
import { formatInterval } from 'src/app/common/temporal/interval/format-interval';
import {
    getNextInterval,
    getPreviousInterval
} from 'src/app/common/temporal/interval/adjacent-interval';

@Component({
    selector: 'app-datetime-range-input',
    templateUrl: './datetime-range-input.component.html',
    styleUrls: ['./datetime-range-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimeRangeInputComponent {
    _closedSubscription = Subscription.EMPTY;

    _disabled = false;

    @Input()
    get rangePicker(): DatetimeRangePickerComponent | undefined {
        return this._rangePicker;
    }
    set rangePicker(rangePicker: DatetimeRangePickerComponent | undefined) {
        if (rangePicker) {
            this._model = rangePicker.registerInput(this);
            this._rangePicker = rangePicker;
            this._closedSubscription.unsubscribe();
            this._closedSubscription = rangePicker.closedStream.subscribe(
                () => {
                    this._changeDetectorRef.markForCheck();
                }
            );
            this._model.selectionChanged.subscribe(() => {
                this.rangeSelected.next(this._model?.selection);
            });
        }
    }
    private _rangePicker?: DatetimeRangePickerComponent;

    @Input()
    get min(): Date | null {
        return this._min;
    }
    set min(value: Date | null) {
        this._min = value;
        this._changeDetectorRef.markForCheck();
    }
    private _min: Date | null = null;

    @Input()
    get max(): Date | null {
        return this._max;
    }
    set max(value: Date | null) {
        this._max = value;
        this._changeDetectorRef.markForCheck();
    }
    private _max: Date | null = null;

    @Output()
    readonly rangeSelected: EventEmitter<DatetimeRange> = new EventEmitter<DatetimeRange>();

    get valueLabel(): string {
        if (this._model?.selection) {
            // temporary fix
            try {
                return formatInterval(this._model.selection.toInterval());
            } catch (error) {
                console.error(error);
            }
        }
        return '(nothing)';
    }

    private _model?: DatetimeRangeSelectionModel;

    readonly stateChanges = new Subject<void>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>
    ) {}

    open(): void {
        if (this._rangePicker && !this._disabled) {
            this._rangePicker?.open();
        }
    }

    getConnectedOverlayOrigin(): ElementRef {
        return this._elementRef;
    }

    selectNextInterval(): void {
        const interval = this._model?.selection.toInterval();
        if (!interval) {
            return;
        }
        const nextInterval = getNextInterval(interval);
        this._model?.updateSelection(
            DatetimeRange.fromInterval(nextInterval),
            this
        );
    }

    selectPreviousInterval(): void {
        const interval = this._model?.selection.toInterval();
        if (!interval) {
            return;
        }
        const previousInterval = getPreviousInterval(interval);
        this._model?.updateSelection(
            DatetimeRange.fromInterval(previousInterval),
            this
        );
    }

    _nextButtonDisabled(): boolean {
        return this._disabled || !this._hasNextInterval();
    }

    _previousButtonDisabled(): boolean {
        return this._disabled || !this._hasPreviousInterval();
    }

    _hasNextInterval(): boolean {
        if (!this._max || !this._model?.selection.end) {
            return true;
        }
        return this._model?.selection.end < this._max;
    }

    _hasPreviousInterval(): boolean {
        if (!this._min || !this._model?.selection.start) {
            return true;
        }
        return this._model?.selection.start > this._min;
    }
}
