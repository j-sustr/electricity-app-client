import { Directionality } from '@angular/cdk/bidi';
import {
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
    Component,
    ComponentRef,
    EventEmitter,
    Inject,
    Input,
    isDevMode,
    NgZone,
    OnDestroy,
    Optional,
    Output,
    ViewContainerRef
} from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DatetimeRangeInputComponent } from '../input/datetime-range-input.component';
import {
    DatetimeRange,
    DatetimeRangeSelectionModel,
    DATETIME_RANGE_SELECTION_MODEL_PROVIDER
} from '../input/datetime-range-selection-model';
import {
    DatetimeRangePickerContentComponent,
    DatetimeRangePickerTarget
} from './datetime-range-picker-content.component';

let datetimeRangePickerUid = 0;

@Component({
    selector: 'app-datetime-range-picker',
    template: '',
    providers: [DATETIME_RANGE_SELECTION_MODEL_PROVIDER]
})
export class DatetimeRangePickerComponent implements OnDestroy {
    private _inputStateChanges = Subscription.EMPTY;

    disabled = false;

    get selectedValue(): DatetimeRange {
        return this._model.selection;
    }
    set selectedValue(value: DatetimeRange) {
        this._model.updateSelection(value, this);
    }

    @Input()
    target: DatetimeRangePickerTarget | null = null;

    private _restoreFocus = true;

    closedStream: EventEmitter<void> = new EventEmitter<void>();

    private _opened = false;

    @Output() targetSelected = new EventEmitter<DatetimeRangePickerTarget>();

    id = `datetime-range-picker-${datetimeRangePickerUid++}`;

    private _popupRef: OverlayRef | null = null;

    private _popupComponentRef: ComponentRef<DatetimeRangePickerContentComponent> | null = null;

    /** The element that was focused before the picker was opened. */
    private _focusedElementBeforeOpen: HTMLElement | null = null;

    private _backdropHarnessClass = `${this.id}-backdrop`;

    daterangeInput!: DatetimeRangeInputComponent;

    readonly stateChanges = new Subject<void>();

    constructor(
        private _overlay: Overlay,
        private _ngZone: NgZone,
        private _viewContainerRef: ViewContainerRef,
        private _model: DatetimeRangeSelectionModel,
        @Optional() private _dir: Directionality,
        @Optional() @Inject(DOCUMENT) private _document?: Document
    ) {}

    ngOnDestroy(): void {
        this._destroyPopup();
        this.close();
        this._inputStateChanges.unsubscribe();
        this.stateChanges.complete();
    }

    registerInput(
        input: DatetimeRangeInputComponent
    ): DatetimeRangeSelectionModel {
        if (this.daterangeInput && isDevMode()) {
            throw Error(
                'A MatDatepicker can only be associated with a single input.'
            );
        }
        this._inputStateChanges.unsubscribe();
        this.daterangeInput = input;
        this._inputStateChanges = input.stateChanges.subscribe(() =>
            this.stateChanges.next(undefined)
        );
        return this._model;
    }

    getMinDate(): Date | null {
        return this.daterangeInput && this.daterangeInput.min;
    }

    /** The maximum selectable date. */
    getMaxDate(): Date | null {
        return this.daterangeInput && this.daterangeInput.max;
    }

    open(): void {
        if (this._opened || this.disabled) {
            return;
        }

        if (!this.daterangeInput && isDevMode()) {
            throw Error(
                'Attempted to open an MatDatepicker with no associated input.'
            );
        }

        // If the `activeElement` is inside a shadow root, `document.activeElement` will
        // point to the shadow root so we have to descend into it ourselves.
        const activeElement: Element | null =
            this._document?.activeElement ?? null;
        this._focusedElementBeforeOpen =
            (activeElement?.shadowRoot?.activeElement as HTMLElement) ||
            activeElement;
        this._openAsPopup();
        this._opened = true;
    }

    close(): void {
        if (!this._opened) {
            return;
        }
        if (this._popupComponentRef && this._popupRef) {
            // const instance = this._popupComponentRef.instance;
            // instance._startExitAnimation();
            // instance._animationDone
            //     .pipe(take(1))
            //     .subscribe(() => this._destroyPopup());
            this._destroyPopup();
        }

        const completeClose = () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this._opened) {
                this._opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        };

        if (
            this._restoreFocus &&
            this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === 'function'
        ) {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        } else {
            completeClose();
        }
    }

    private _openAsPopup(): void {
        const portal = new ComponentPortal<DatetimeRangePickerContentComponent>(
            DatetimeRangePickerContentComponent,
            this._viewContainerRef
        );

        this._destroyPopup();
        this._createPopup();
        const popupRef = this._popupRef as OverlayRef;
        this._popupComponentRef = popupRef.attach(portal);
        this._popupComponentRef.instance.picker = this;

        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
            popupRef.updatePosition();
        });
    }

    private _createPopup(): void {
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(
                this.daterangeInput.getConnectedOverlayOrigin()
            )
            .withTransformOriginOn('.datetime-range-picker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition();

        const scrollStrategy = this._overlay.scrollStrategies.reposition();

        const overlayConfig = new OverlayConfig({
            positionStrategy: this._setConnectedPositions(positionStrategy),
            hasBackdrop: true,
            backdropClass: [
                'overlay-transparent-backdrop',
                this._backdropHarnessClass
            ],
            direction: this._dir,
            scrollStrategy: scrollStrategy,
            panelClass: 'datetime-range-picker-popup'
        });

        this._popupRef = this._overlay.create(overlayConfig);
        this._popupRef.overlayElement.setAttribute('role', 'dialog');

        merge(
            this._popupRef.backdropClick(),
            this._popupRef.detachments()
        ).subscribe((event) => {
            if (event) {
                event.preventDefault();
            }

            this.close();
        });
    }

    private _destroyPopup() {
        if (this._popupRef) {
            this._popupRef.dispose();
            this._popupRef = this._popupComponentRef = null;
        }
    }

    private _setConnectedPositions(
        strategy: FlexibleConnectedPositionStrategy
    ) {
        const xPosition = 'start';
        const primaryX = xPosition;
        const secondaryX = primaryX === 'start' ? 'end' : 'start';
        const primaryY = 'top';
        const secondaryY = primaryY === 'top' ? 'bottom' : 'top';

        return strategy.withPositions([
            {
                originX: primaryX,
                originY: secondaryY,
                overlayX: primaryX,
                overlayY: primaryY
            },
            {
                originX: primaryX,
                originY: primaryY,
                overlayX: primaryX,
                overlayY: secondaryY
            },
            {
                originX: secondaryX,
                originY: secondaryY,
                overlayX: secondaryX,
                overlayY: primaryY
            },
            {
                originX: secondaryX,
                originY: primaryY,
                overlayX: secondaryX,
                overlayY: secondaryY
            }
        ]);
    }
}
