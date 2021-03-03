import { fn } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Selector, Store } from '@ngrx/store';
import { isEqual } from 'lodash';
import { combineLatest, forkJoin } from 'rxjs';
import {
    filter,
    map,
    pairwise,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';
import { AppState } from '../app-store.state';
import * as cdActions from '../costs-detail/costs-detail.actions';
import { selectCostsDetailHasData } from '../costs-detail/costs-detail.selectors';
import * as coActions from '../costs-overview/costs-overview.actions';
import * as pfoActions from '../power-factor-overview/power-factor-overview.actions';
import * as pfdActions from '../power-factor-detail/power-factor-detail.actions';
import { selectPowerFactorOverviewHasData } from '../power-factor-overview/power-factor-overview.selectors';
import { selectRouterState } from '../router/router.selectors';
import { setIntervals } from './data-source.actions';
import { selectIntervals } from './data-source.selectors';
import { selectCostsOverviewHasData } from '../costs-overview/costs-overview.selectors';

const SECTION_URLS = [
    '/costs/overview',
    '/costs/overview',
    '/costs/detail',
    '/power-factor/overview',
    '/power-factor/detail'
] as const;

type SectionURL = typeof SECTION_URLS[number];

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
                        this.store.pipe(select(selectRouterState))
                    ]),
                    (v1, v2) => v2
                ),
                filter(([, routerStateUrl]) => {
                    return isSectionUrl(routerStateUrl.url);
                }),
                map(([intervalsChanged, routerStateUrl]) => {
                    const url = routerStateUrl.url;
                    return {
                        intervalsChanged,
                        hasDataSelector: mapUrlToHasDataSelector(url as never),
                        getDataAction: mapUrlToGetDataAction(url as never)
                    };
                }),
                switchMap(
                    ({ intervalsChanged, hasDataSelector, getDataAction }) =>
                        this.store.pipe(
                            select(hasDataSelector),
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

function isSectionUrl(url: string): url is SectionURL {
    return SECTION_URLS.includes(url as never);
}

function mapUrlToGetDataAction(url: SectionURL): Action {
    switch (url) {
        case '/costs/overview':
            return coActions.getOverview();
        case '/costs/detail':
            return cdActions.getDetail();
        case '/power-factor/overview':
            return pfoActions.getOverview();
        case '/power-factor/detail':
            return pfoActions.getOverview();
    }
    throw new Error('invalid section url');
}

function mapUrlToHasDataSelector(url: SectionURL): Selector<AppState, boolean> {
    switch (url) {
        case '/costs/overview':
            return selectCostsOverviewHasData;
        case '/costs/detail':
            return selectCostsDetailHasData;
        case '/power-factor/overview':
            return selectPowerFactorOverviewHasData;
    }
    throw new Error('invalid section url');
}
