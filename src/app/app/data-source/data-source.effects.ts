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
import {
    IDataSourceClient,
    OpenDataSourceCommand
} from 'src/app/web-api-client';
import { DATA_SOURCE_CLIENT } from 'src/app/web-api-client-di';
import { AppState } from '../app-store.state';
import {
    selectGroupId,
    selectRouterPath
} from '../common/router/router.selectors';
import {
    isSectionPath,
    mapSectionPathToArch,
    mapSectionPathToGetDataAction,
    mapSectionPathToHasDataSelector,
    SectionPath
} from '../common/router/section-path-utils';
import {
    getInfoError,
    getInfoSuccess,
    openDataSource,
    openDataSourceError,
    openDataSourceSuccess,
    setIntervals,
    setPhases
} from './data-source.actions';
import { selectIntervals } from './data-source.selectors';

@Injectable()
export class DataSourceEffects {
    openDataSource$ = createEffect(() =>
        this.actions$.pipe(
            ofType(openDataSource),
            switchMap(({ tenant }) =>
                this.client
                    .open(
                        new OpenDataSourceCommand({
                            tenant
                        })
                    )
                    .pipe(
                        map(() => {
                            return openDataSourceSuccess({
                                name: '(no name)'
                            });
                        }),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                openDataSourceError({
                                    error
                                })
                            )
                        )
                    )
            )
        )
    );

    getData$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(setIntervals, setPhases),
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
