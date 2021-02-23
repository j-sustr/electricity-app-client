import { createAction, props } from '@ngrx/store';

export const actionDataSourceSetIntervals = createAction(
    '[DataSource] Set Intervals',
    props<{
        interval1: Interval;
        interval2?: Interval;
    }>()
);

export const actionDataSourceSetInterval = createAction(
    '[DataSource] Set Interval',
    props<{
        index: 0 | 1;
        start: Date | number;
        end: Date | number;
    }>()
);

export const actionDataSourceRemoveInterval = createAction(
    '[DataSource] Remove Interval'
);

export const actionDataSourceSetInfo = createAction(
    '[DataSource] Set Info',
    props<{
        minDatetime: Date;
        maxDatetime: Date;
    }>()
);
