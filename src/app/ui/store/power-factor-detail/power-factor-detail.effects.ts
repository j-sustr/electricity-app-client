import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app-store.state';
import { getDetail, getDistribution } from './power-factor-detail.actions';
import { selectDetailType } from './power-factor-detail.selectors';

@Injectable()
export class PowerFactorDetailEffects {
    getDetail$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDetail),
            withLatestFrom(this.store.pipe(select(selectDetailType))),
            map(([, detailType]) => {
                if (detailType === 'distribution') {
                    return getDistribution();
                }

                throw new Error('invalid detailType');
            })
        );
    });

    constructor(private actions$: Actions, private store: Store<AppState>) {}
}
