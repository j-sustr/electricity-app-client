import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DatetimeRangePickerComponent } from './datetime-range-picker.component';

@Component({
    selector: 'app-daterange-picker-content',
    templateUrl: 'datetime-range-picker-content.component.html'
    // providers: [CommonModule]
})
export class DatetimeRangePickerContentComponent {
    picker?: DatetimeRangePickerComponent;

    _animationDone = new Subject<void>();

    years = [2020, 2021, 2022];

    constructor() {}

    _handleUserSelection(event: unknown) {
        throw Error('not implemented');
    }

    _startExitAnimation() {
        throw Error('not implemented');
    }
}
