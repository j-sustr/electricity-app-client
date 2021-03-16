import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app-store.state';
import { getUserGroups } from '../../../store/groups/groups.actions';
import {
    GroupTreeView,
    selectGroupTreeView,
    selectSelectedGroupName
} from '../../../store/groups/groups.selectors';

@Component({
    selector: 'app-detail-view-controls',
    templateUrl: './detail-view-controls.component.html',
    styleUrls: ['./detail-view-controls.component.scss']
})
export class DetailViewControlsComponent implements OnInit {
    groupPickerPopupVisible = false;

    selectedGroupName$: Observable<string | null>;
    groupTree$: Observable<GroupTreeView | null>;

    constructor(private store: Store<AppState>) {
        this.selectedGroupName$ = this.store.pipe(
            select(selectSelectedGroupName)
        );
        this.groupTree$ = this.store.pipe(select(selectGroupTreeView));
    }

    ngOnInit(): void {
        this.store.dispatch(getUserGroups());
    }

    openGroupPicker(): void {
        this.groupPickerPopupVisible = true;
    }

    selectGroupTreeItem(event: unknown): void {
        console.log(event);
    }
}
