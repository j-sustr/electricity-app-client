import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { isEqual } from 'lodash';
import { combineLatest } from 'rxjs';
import {
    filter,
    first,
    map,
    pairwise,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';
import { AppState } from '../app-store.state';
import { selectRouterPath } from '../router/router.selectors';
import {
    isSectionPath,
    mapSectionPathToHasDataSelector,
    mapSectionPathToGetDataAction
} from '../router/section-path-utils';
import { setIntervals } from './data-source.actions';
import { selectIntervals } from './data-source.selectors';

@Injectable()
export class DataSourceEffects {
    getData$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(setIntervals),
                withLatestFrom(
                    combineLatest([
                        this.store.pipe(
                            select(selectIntervals),
                            pairwise(),
                            map(([prev, curr]) => !isEqual(prev, curr))
                        ),
                        this.store.pipe(select(selectRouterPath))
                    ]),
                    (v1, v2) => v2
                ),
                filter(([, routerPath]) => {
                    return isSectionPath(routerPath);
                }),
                map(([intervalsChanged, routerPath]) => {
                    return {
                        intervalsChanged,
                        hasDataSelector: mapSectionPathToHasDataSelector(
                            routerPath as never
                        ),
                        getDataAction: mapSectionPathToGetDataAction(
                            routerPath as never
                        )
                    };
                }),
                switchMap(
                    ({ intervalsChanged, hasDataSelector, getDataAction }) =>
                        this.store.pipe(
                            select(hasDataSelector),
                            first(),
                            map((hasData) => ({
                                intervalsChanged,
                                hasData,
                                getDataAction
                            }))
                        )
                ),
                tap(({ intervalsChanged, hasData, getDataAction }) => {
                    if (intervalsChanged || !hasData) {
                        this.store.dispatch(getDataAction);
                    }
                })
            );
        },
        { dispatch: false }
    );

    constructor(private actions$: Actions, private store: Store<AppState>) {}
}
