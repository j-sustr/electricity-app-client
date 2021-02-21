import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    actionRemoveInterval,
    actionSetInterval
} from 'src/app/ui/store/app/app.actions';
import {
    DatetimeRangeComparisonInputComponent,
    DatetimeRangeComparisonInputValueChange
} from '../comparison/datetime-range-comparison-input.component';

@Component({
    selector: 'app-datetime-range-comparison-input-container',
    templateUrl: './datetime-range-comparison-input-container.component.html',
    styleUrls: ['./datetime-range-comparison-input-container.component.scss']
})
export class DatetimeRangeComparisonInputContainerComponent
    implements AfterViewInit {
    min = null;
    max = null;

    @ViewChild(DatetimeRangeComparisonInputComponent)
    input!: DatetimeRangeComparisonInputComponent;

    constructor(private store: Store) {}

    ngAfterViewInit(): void {
        this.input.valueChange.subscribe(
            (event: DatetimeRangeComparisonInputValueChange) => {
                const interval = event.value.toInterval();
                this.store.dispatch(
                    actionSetInterval({
                        index: event.index === 0 ? 0 : 1,
                        start: interval.start,
                        end: interval.end
                    })
                );
            }
        );

        this.input.rangeRemoveChange.subscribe(() => {
            this.store.dispatch(actionRemoveInterval());
        });
    }
}
