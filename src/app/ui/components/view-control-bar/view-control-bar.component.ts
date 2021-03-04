import { Component, Input, OnInit } from '@angular/core';
import { select, Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    filter,
    map,
    share,
    shareReplay,
    switchMap,
    tap
} from 'rxjs/operators';
import { selectOnce } from 'src/app/common/observable/selectOnce';
import { AppState } from '../../store/app-store.state';
import { ViewType } from '../../store/models';
import { selectRouterPath } from '../../store/router/router.selectors';
import {
    isSectionPath,
    mapRoutePathToSetViewTypeAction,
    mapRoutePathToViewTypeSelector,
    SectionPath
} from '../../store/router/section-path-utils';

type ViewTypeOption = {
    text: string;
    key: 'table' | 'chart';
};

@Component({
    selector: 'app-view-control-bar',
    templateUrl: './view-control-bar.component.html',
    styleUrls: ['./view-control-bar.component.scss']
})
export class ViewControlBarComponent implements OnInit {
    viewTypeOptions: ViewTypeOption[] = [
        {
            text: 'Table',
            key: 'table'
        },
        {
            text: 'Chart',
            key: 'chart'
        }
    ];

    @Input()
    viewTypeControl = true;

    viewTypeSeletedItemKeys = ['table'];

    sectionPath$: Observable<SectionPath>;

    constructor(private store: Store<AppState>) {
        this.sectionPath$ = this.store.pipe(
            selectOnce(selectRouterPath),
            filter((path: string): path is SectionPath => isSectionPath(path)),
            shareReplay(1)
        );
    }

    ngOnInit(): void {
        if (this.viewTypeControl) {
            this.sectionPath$
                .pipe(
                    map((path) => mapRoutePathToViewTypeSelector(path)),
                    switchMap((selector) => this.store.pipe(select(selector))),
                    tap((viewType) => {
                        this.viewTypeSeletedItemKeys = [viewType];
                    })
                )
                .subscribe();
        }
    }

    viewTypeItemClick(event: unknown): void {
        this.sectionPath$
            .pipe(
                map(mapRoutePathToSetViewTypeAction),
                tap((action) => this.store.dispatch(action))
            )
            .subscribe();
    }
}
