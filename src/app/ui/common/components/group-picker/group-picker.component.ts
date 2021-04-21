import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app/app-store.state';
import { selectRouterPath } from 'src/app/app/common/router/router.selectors';
import { isDetailSectionPath } from 'src/app/app/common/router/section-path-utils';
import { GroupInfo } from 'src/app/app/groups/groups.model';
import {
    GroupTreeView,
    selectGroupTreeView,
    selectSelectedGroup
} from 'src/app/app/groups/groups.selectors';

@Component({
    selector: 'app-group-picker',
    templateUrl: './group-picker.component.html',
    styleUrls: ['./group-picker.component.scss']
})
export class GroupPickerComponent {
    @Input()
    visible = false;

    @Output()
    visibleChange = new EventEmitter<boolean>();

    selectedGroup$: Observable<GroupInfo | null>;
    groupTree$: Observable<GroupTreeView>;

    constructor(private store: Store<AppState>, private router: Router) {
        this.selectedGroup$ = this.store.pipe(select(selectSelectedGroup));
        this.groupTree$ = this.store.pipe(select(selectGroupTreeView));
    }

    selectTreeItem(event: { itemData: { id: string } }): void {
        this.close();

        const groupId = event?.itemData?.id;
        if (!groupId) {
            throw new Error('empty groupId');
        }
        this.store
            .pipe(
                select(selectRouterPath),
                take(1),
                tap((path) => {
                    if (!isDetailSectionPath(path)) {
                        throw new Error('not detail section path');
                    }
                    path = path.replace(':groupId', groupId);
                    void this.router.navigate([path]);
                })
            )
            .subscribe();
    }

    close(): void {
        this.visibleChange.next(false);
    }
}
