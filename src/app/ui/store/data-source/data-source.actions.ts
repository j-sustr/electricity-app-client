import { createAction, props } from '@ngrx/store';

export const actionDataSourceSetIntervals = createAction(
    '[DataSource] Set Intervals',
    props<{
        interval1: Interval;
        interval2?: Interval;
    }>()
);

export const actionDataSourceSetInfo = createAction(
    '[DataSource] Set Info',
    props<{
        minDatetime: Date;
        maxDatetime: Date;
    }>()
);
