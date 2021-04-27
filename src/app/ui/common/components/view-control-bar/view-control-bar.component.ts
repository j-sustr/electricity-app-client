import { Component, Input, OnInit } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { selectOnce } from 'src/app/common/observable/selectOnce';
import { AppState } from '../../../../app/app-store.state';
import { setPhases } from '../../../../app/data-source/data-source.actions';
import { Phases } from '../../../../app/data-source/data-source.model';
import { selectPhases } from '../../../../app/data-source/data-source.selectors';
import { selectRouterPath } from '../../../../app/common/router/router.selectors';
import {
    isSectionPath,
    mapSectionPathToSetViewTypeAction,
    mapSectionPathToViewTypeSelector,
    SectionPath
} from '../../../../app/common/router/section-path-utils';

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
            text: 'Chart',
            key: 'chart'
        },
        {
            text: 'Table',
            key: 'table'
        }
    ];

    @Input()
    phasesPicker = false;

    phasesPickerOpen = false;

    phases?: Phases;

    phases$: Observable<Phases>;

    @Input()
    aggregationInput = false;

    @Input()
    viewTypeControl = false;

    viewTypeSeletedItemKeys = ['table'];

    sectionPath$: Observable<SectionPath>;

    constructor(private store: Store<AppState>) {
        this.phases$ = this.store.pipe(
            select(selectPhases),
            tap((phases) => {
                this.phases = phases;
            })
        );

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

    phasesOutsideClick(): void {
        this.phasesPickerOpen = false;
    }

    phaseCheckboxValueChanged(event: {
        value: boolean;
        element: HTMLElement;
    }): void {
        const name = event?.element?.getAttribute('name');
        if (name && this.phases) {
            this.store.dispatch(
                setPhases({
                    ...this.phases,
                    [name]: event.value
                })
            );
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
