import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
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
export class GroupPickerComponent implements OnChanges {
    @Input()
    visible = false;

    @Output()
    visibleChange = new EventEmitter<boolean>();

    selectedGroup$: Observable<GroupInfo | null>;
    groupTree$: Observable<GroupTreeView>;

    constructor(private store: Store<AppState>) {
        this.selectedGroup$ = this.store.pipe(select(selectSelectedGroup));
        this.groupTree$ = this.store.pipe(select(selectGroupTreeView));
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changes', changes);
    }

    selectTreeItem(event: unknown): void {
        console.log(event);
    }
}
