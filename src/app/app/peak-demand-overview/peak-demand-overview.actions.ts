import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PeakDemandOverviewItem } from 'src/app/web-api-client';

export const setViewType = createAction(
    '[Peak Demand Overview] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const toggleEnergy = createAction(
    '[Peak Demand Overview] Toggle Energy'
);

export const getOverview = createAction('[Peak Demand Overview] Get Overview');

export const getOverviewSuccess = createAction(
    '[Peak Demand Overview] Get Overview Success',
    props<{
        items1: PeakDemandOverviewItem[];
        items2: PeakDemandOverviewItem[] | null;
    }>()
);

export const getOverviewError = createAction(
    '[Peak Demand Overview] Get Overview Error',
    props<{ error: HttpErrorResponse }>()
);
