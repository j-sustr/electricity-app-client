import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-datetime-range-comparison-input-container',
    templateUrl: './datetime-range-comparison-input-container.component.html',
    styleUrls: ['./datetime-range-comparison-input-container.component.scss']
})
export class DatetimeRangeComparisonInputContainerComponent {
    min = null;
    max = null;

    constructor(private store: Store) {}
}
