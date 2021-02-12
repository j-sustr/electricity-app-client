import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-datetime-range-input',
    templateUrl: './datetime-range-input.component.html',
    styleUrls: ['./datetime-range-input.component.scss']
})
export class DatetimeRangeInputComponent {
    disabled = false;

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
        const a = this.intervalStart?.toISOString() ?? '';
        const b = this.intervalStart?.toISOString() ?? '';
        return `${a} - ${b}`;
    }

    intervalStart: Date | null = null;
    intervalEnd: Date | null = null;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    setInterval(start: Date | null, end: Date | null): void {
        this.intervalStart = start;
        this.intervalEnd = end;
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
        return this.disabled || !this.hasNextInterval();
    }

    _previousButtonsDisabled(): boolean {
        return this.disabled || !this.hasPreviousInterval();
    }
}
