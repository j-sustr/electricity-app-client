import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupInfo } from 'src/app/app/groups/groups.model';
import { AppState } from '../../../../app/app-store.state';
import {
    GroupTreeView,
    selectGroupTreeView,
    selectSelectedGroup
} from '../../../../app/groups/groups.selectors';

@Component({
    selector: 'app-detail-view-controls',
    templateUrl: './detail-view-controls.component.html',
    styleUrls: ['./detail-view-controls.component.scss']
})
export class DetailViewControlsComponent {
    groupPickerPopupVisible = false;

    selectedGroup$: Observable<GroupInfo | null>;
    groupTree$: Observable<GroupTreeView>;

    constructor(private store: Store<AppState>) {
        this.selectedGroup$ = this.store.pipe(select(selectSelectedGroup));
        this.groupTree$ = this.store.pipe(select(selectGroupTreeView));
    }

    openGroupPicker(): void {
        this.groupPickerPopupVisible = true;
    }

    selectGroupTreeItem(event: unknown): void {
        console.log(event);
    }
}
