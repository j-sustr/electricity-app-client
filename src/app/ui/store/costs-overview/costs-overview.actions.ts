import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CostlyQuantitiesOverviewItem } from 'src/app/web-api-client';

export const getOverview = createAction('[Costs Overview] Get Overview');

export const getOverviewSuccess = createAction(
    '[Costs Overview] Get Overview Success',
    props<{
        items1: CostlyQuantitiesOverviewItem[];
        items2: CostlyQuantitiesOverviewItem[] | null;
    }>()
);

export const getOverviewError = createAction(
    '[Costs Overview] Get Overview Error',
    props<{ error: HttpErrorResponse }>()
);
