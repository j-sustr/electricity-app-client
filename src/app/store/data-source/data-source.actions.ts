import { HttpErrorResponse } from '@angular/common/http';
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

export const getInfo = createAction('[DataSource] Get Info');

export const getInfoSuccess = createAction(
    '[DataSource] Get Info Success',
    props<{
        minDatetime: Date;
        maxDatetime: Date;
    }>()
);

export const getInfoError = createAction(
    '[DataSource] Get Info Error',
    props<{ error: HttpErrorResponse }>()
);
