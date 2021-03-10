import { createAction, props } from '@ngrx/store';

export const setIntervals = createAction(
    '[DataSource] Set Intervals',
    props<{
        interval1: Interval;
        interval2?: Interval;
    }>()
);

export const setPhases = createAction(
    '[DataSource] Set Phases',
    props<{
        main: boolean;
        l1: boolean;
        l2: boolean;
        l3: boolean;
    }>()
);

export const setInfo = createAction(
    '[DataSource] Set Info',
    props<{
        minDatetime: Date;
        maxDatetime: Date;
    }>()
);
