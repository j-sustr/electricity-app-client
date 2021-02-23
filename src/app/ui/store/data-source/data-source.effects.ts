import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from '../app-store.state';
import { actionPowerFactorOverviewGetData } from '../power-factor-overview/power-factor-overview.actions';
import { actionDataSourceSetIntervals } from './data-source.actions';

@Injectable()
export class DataSourceEffects {
    effectName$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(actionDataSourceSetIntervals),
                tap(() => {
                    this.store.dispatch(actionPowerFactorOverviewGetData());
                })
            );
        },
        { dispatch: false }
    );

    constructor(private actions$: Actions, private store: Store<AppState>) {}
}
