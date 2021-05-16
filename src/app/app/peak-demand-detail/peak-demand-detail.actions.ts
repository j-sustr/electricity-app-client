import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { DemandAggregation } from 'src/app/web-api-client';
import { DemandSeries } from './peak-demand-detail.model';

export const setAggregation = createAction(
    '[Peak Demand Detail] Set Aggregation',
    props<{ aggregation: DemandAggregation }>()
);

export const getDetail = createAction('[Peak Demand Detail] Get Detail');

export const getDetailSuccess = createAction(
    '[Peak Demand Detail] Get Detail Success',
    props<{
        series1: DemandSeries;
        series2: DemandSeries | null;
        interval1: Interval;
        interval2: Interval | null;
    }>()
);

export const getDetailError = createAction(
    '[Peak Demand Detail] Get Detail Error',
    props<{ error: HttpErrorResponse }>()
);
