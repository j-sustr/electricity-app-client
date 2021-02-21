import { createAction, props } from '@ngrx/store';

export const actionSetInterval = createAction(
    '[DataSource] Set Interval',
    props<{
        index: 0 | 1;
        start: Date | number;
        end: Date | number;
    }>()
);

export const actionRemoveInterval = createAction(
    '[DataSource] Remove Interval'
);
