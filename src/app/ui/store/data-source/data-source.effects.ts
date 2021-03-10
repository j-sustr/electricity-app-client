import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import { combineLatest, merge, of } from 'rxjs';
import {
    catchError,
    distinctUntilChanged,
    filter,
    first,
    map,
    pairwise,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';
import { IDataSourceClient } from 'src/app/web-api-client';
import { DATA_SOURCE_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import { selectGroupId, selectRouterPath } from '../router/router.selectors';
import {
    isSectionPath,
    mapSectionPathToArch,
    mapSectionPathToGetDataAction,
    mapSectionPathToHasDataSelector,
    SectionPath
} from '../router/section-path-utils';
import {
    getInfo,
    getInfoError,
    getInfoSuccess,
    setIntervals
} from './data-source.actions';
import { selectIntervals } from './data-source.selectors';

const INIT = of('init-effect-trigger');

@Injectable()
export class DataSourceEffects {
    getInfo$ = createEffect(() =>
        merge(this.actions$.pipe(ofType(routerNavigatedAction))).pipe(
            withLatestFrom(
                combineLatest([
                    this.store.pipe(select(selectGroupId)),
                    this.store.pipe(select(selectRouterPath))
                ]),
                (v1, v2) => v2
            ),
            filter(([, routerPath]) => {
                return isSectionPath(routerPath);
            }),
            distinctUntilChanged(
                ([, prevPath], [, currPath]) => prevPath === currPath
            ),
            switchMap(([groupId, routerPath]) => {
                const arch = mapSectionPathToArch(routerPath as SectionPath);
                return this.client.getInfo(groupId, arch).pipe(
                    map((info) =>
                        getInfoSuccess({
                            minDatetime: info.minDatetime ?? new Date(NaN),
                            maxDatetime: info.maxDatetime ?? new Date(NaN)
                        })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            getInfoError({
                                error
                            })
                        )
                    )
                );
            })
        )
    );

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

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        @Inject(DATA_SOURCE_CLIENT)
        private client: IDataSourceClient
    ) {}
}
