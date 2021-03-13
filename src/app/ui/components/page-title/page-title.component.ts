import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-store.state';
import { selectDataSourceName } from '../../store/data-source/data-source.selectors';

@Component({
    selector: 'app-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
    @Input()
    title = '';

    dataName$: Observable<string>;

    pickerOpen = false;

    constructor(private store: Store<AppState>) {
        this.dataName$ = this.store.pipe(select(selectDataSourceName));
    }

    openPicker(): void {
        this.pickerOpen = true;
    }
}
