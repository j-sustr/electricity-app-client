import { Component, Input, OnInit } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { selectOnce } from 'src/app/common/observable/selectOnce';
import { AppState } from '../../store/app-store.state';
import { selectRouterPath } from '../../store/router/router.selectors';
import {
    isSectionPath,
    mapSectionPathToSetViewTypeAction,
    mapSectionPathToViewTypeSelector,
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
    viewTypeControl = false;

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
                    map((path) => mapSectionPathToViewTypeSelector(path)),
                    switchMap((selector) => this.store.pipe(select(selector))),
                    tap((viewType) => {
                        this.viewTypeSeletedItemKeys = [viewType];
                    })
                )
                .subscribe();
        }
    }

    viewTypeItemClick(event: { itemData: { key: string } }): void {
        this.sectionPath$
            .pipe(
                map(mapSectionPathToSetViewTypeAction),
                tap((action) =>
                    this.store.dispatch(
                        action({
                            viewType: event?.itemData?.key
                        }) as Action
                    )
                )
            )
            .subscribe();
    }
}
