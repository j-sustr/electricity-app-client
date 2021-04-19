import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { DemandSeries } from './peak-demand-detail.model';

export const setViewType = createAction(
    '[Peak Demand Detail] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const getDetail = createAction('[Peak Demand Detail] Get Detail');

export const getDetailSuccess = createAction(
    '[Peak Demand Detail] Get Detail Success',
    props<{
        series1: DemandSeries;
        series2: DemandSeries | null;
    }>()
);

export const getDetailError = createAction(
    '[Peak Demand Detail] Get Detail Error',
    props<{ error: HttpErrorResponse }>()
);
