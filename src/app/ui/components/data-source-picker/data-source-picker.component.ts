import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-store.state';

@Component({
    selector: 'app-data-source-picker',
    templateUrl: './data-source-picker.component.html',
    styleUrls: ['./data-source-picker.component.scss']
})
export class DataSourcePickerComponent {
    @Input()
    visible = false;

    @Output()
    visibleChange = new EventEmitter<boolean>();

    constructor(private store: Store<AppState>) {}
}
