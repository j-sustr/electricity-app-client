import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import { combineLatest, of } from 'rxjs';
import {
    catchError,
    filter,
    first,
    map,
    pairwise,
    startWith,
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
import { selectRouterPath } from '../common/router/router.selectors';
import {
    isSectionPath,
    mapSectionPathToGetDataAction,
    mapSectionPathToHasDataSelector
} from '../common/router/section-path-utils';
import {
    getDataSourceInfo,
    getDataSourceInfoError,
    getDataSourceInfoSuccess,
    openDataSource,
    openDataSourceError,
    openDataSourceSuccess,
    setIntervals,
    setPhases
} from './data-source.actions';
import { selectIntervals, selectPhases } from './data-source.selectors';

@Injectable()
export class DataSourceEffects {
    open$ = createEffect(() =>
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
                        map((dto) => {
                            return openDataSourceSuccess({
                                name: dto.name ?? '(no name)'
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

    getInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getDataSourceInfo),
            switchMap(() =>
                this.client.getInfo().pipe(
                    map((dto) => {
                        return getDataSourceInfoSuccess({
                            name: dto.name ?? '(no name)'
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            getDataSourceInfoError({
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
                        this.store.pipe(
                            select(selectPhases),
                            startWith(null),
                            pairwise(),
                            map(([prev, curr]) => !isEqual(prev, curr))
                        ),
                        this.store.pipe(select(selectRouterPath))
                    ]),
                    (v1, v2) => v2
                ),
                filter(([, , routerPath]) => {
                    return isSectionPath(routerPath);
                }),
                map(([intervalsChanged, phasesChanged, routerPath]) => {
                    return {
                        intervalsChanged,
                        phasesChanged,
                        hasDataSelector: mapSectionPathToHasDataSelector(
                            routerPath as never
                        ),
                        getDataAction: mapSectionPathToGetDataAction(
                            routerPath as never
                        )
                    };
                }),
                switchMap(
                    ({
                        intervalsChanged,
                        phasesChanged,
                        hasDataSelector,
                        getDataAction
                    }) =>
                        this.store.pipe(
                            select(hasDataSelector),
                            first(),
                            map((hasData) => ({
                                intervalsChanged,
                                phasesChanged,
                                hasData,
                                getDataAction
                            }))
                        )
                ),
                tap(
                    ({
                        intervalsChanged,
                        phasesChanged,
                        hasData,
                        getDataAction
                    }) => {
                        if (intervalsChanged || phasesChanged || !hasData) {
                            this.store.dispatch(getDataAction);
                        }
                    }
                )
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
