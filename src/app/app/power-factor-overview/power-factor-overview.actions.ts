import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PowerFactorOverviewItem } from 'src/app/web-api-client';

export const setViewType = createAction(
    '[Power Factor Overview] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const toggleEnergy = createAction(
    '[Power Factor Overview] Toggle Energy'
);

export const getOverview = createAction('[Power Factor Overview] Get Overview');

export const getOverviewSuccess = createAction(
    '[Power Factor Overview] Get Overview Success',
    props<{
        items1: PowerFactorOverviewItem[];
        items2: PowerFactorOverviewItem[] | null;
    }>()
);

export const getOverviewError = createAction(
    '[Power Factor Overview] Get Overview Error',
    props<{ error: HttpErrorResponse }>()
);
