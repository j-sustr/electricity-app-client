import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TenantDto } from 'src/app/web-api-client';

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

export const openDataSource = createAction(
    '[DataSource] Open DataSource',
    props<{
        tenant: TenantDto;
    }>()
);

export const openDataSourceSuccess = createAction(
    '[DataSource] Open DataSource Success',
    props<{ name: string }>()
);

export const openDataSourceError = createAction(
    '[DataSource] Open DataSource Error',
    props<{ error: HttpErrorResponse }>()
);
