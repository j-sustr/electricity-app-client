import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from '../app-store.state';
import * as coActions from '../costs-overview/costs-overview.actions';
import * as pfoActions from '../power-factor-overview/power-factor-overview.actions';
import * as pfdActions from '../power-factor-detail/power-factor-detail.actions';
import { setIntervals } from './data-source.actions';

@Injectable()
export class DataSourceEffects {
    effectName$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(setIntervals),
                tap(() => {
                    this.store.dispatch(pfoActions.getOverview());
                })
            );
        },
        { dispatch: false }
    );

    constructor(private actions$: Actions, private store: Store<AppState>) {}
}
