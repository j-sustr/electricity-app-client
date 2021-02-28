import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CostsOverviewDto } from 'src/app/web-api-client';

export const getOverview = createAction('[Costs Overview] Get Overview');

export const getOverviewSuccess = createAction(
    '[Costs Overview] Get Overview Success',
    props<{ dto: CostsOverviewDto }>()
);

export const getOverviewError = createAction(
    '[Costs Overview] Get Overview Error',
    props<{ error: HttpErrorResponse }>()
);
