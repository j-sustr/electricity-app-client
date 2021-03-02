import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app-store.state';
import * as coActions from '../costs-overview/costs-overview.actions';
import * as cdActions from '../costs-detail/costs-detail.actions';
import * as pfoActions from '../power-factor-overview/power-factor-overview.actions';
import * as pfdActions from '../power-factor-detail/power-factor-detail.actions';
import { setIntervals } from './data-source.actions';
import { selectRouterState } from '../router/router.selectors';

@Injectable()
export class DataSourceEffects {
    effectName$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(setIntervals),
                withLatestFrom(this.store.pipe(select(selectRouterState))),
                map(([, routerStateUrl]) => {
                    console.log(routerStateUrl);
                    switch (routerStateUrl.url) {
                        case '/costs/overview':
                            this.store.dispatch(coActions.getOverview());
                            return;
                        case '/costs/detail':
                            this.store.dispatch(cdActions.getDetail());
                            return;
                        case '/power-factor/overview':
                            this.store.dispatch(pfoActions.getOverview());
                            return;
                    }
                })
            );
        },
        { dispatch: false }
    );

    constructor(private actions$: Actions, private store: Store<AppState>) {}
}
