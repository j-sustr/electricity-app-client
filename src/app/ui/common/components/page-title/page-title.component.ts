import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedGroupName } from 'src/app/app/groups/groups.selectors';
import { AppState } from '../../../../app/app-store.state';

@Component({
    selector: 'app-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
    @Input()
    title = '';

    dataName$: Observable<string | null>;

    pickerOpen = false;

    constructor(private store: Store<AppState>) {
        this.dataName$ = this.store.pipe(select(selectSelectedGroupName));
    }

    openPicker(): void {
        this.pickerOpen = true;
    }
}
