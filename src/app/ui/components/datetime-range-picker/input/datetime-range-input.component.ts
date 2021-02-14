import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DatetimeRangeSelectionModel } from './datetime-range-selection-model';
import { DatetimeRangePickerComponent } from '../picker/datetime-range-picker.component';

@Component({
    selector: 'app-datetime-range-input',
    templateUrl: './datetime-range-input.component.html',
    styleUrls: ['./datetime-range-input.component.scss']
})
export class DatetimeRangeInputComponent {
    get opened(): boolean {
        return this._rangePicker?.opened ?? false;
    }

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
                    console.log('closed');
                }
            );
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

    get valueLabel(): string {
        const a = this._model?.selection.start?.toISOString() ?? '';
        const b = this._model?.selection.end?.toISOString() ?? '';
        return `${a} - ${b}`;
    }

    private _model?: DatetimeRangeSelectionModel;

    stateChanges = new Subject<void>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>
    ) {}

    open(event: Event): void {
        if (this._rangePicker && !this._disabled) {
            this._rangePicker?.open();
            event.stopPropagation();
        }
    }

    getConnectedOverlayOrigin(): ElementRef {
        return this._elementRef;
    }

    nextInterval(): void {
        throw new Error('not implemented');
    }

    previousInterval(): void {
        throw new Error('not implemented');
    }

    hasNextInterval(): boolean {
        return true;
    }

    hasPreviousInterval(): boolean {
        return true;
    }

    _nextButtonsDisabled(): boolean {
        return this._disabled || !this.hasNextInterval();
    }

    _previousButtonsDisabled(): boolean {
        return this._disabled || !this.hasPreviousInterval();
    }
}
