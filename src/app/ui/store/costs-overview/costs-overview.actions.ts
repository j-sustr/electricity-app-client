import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CostsOverviewItem } from './costs-overview.model';

export const getOverview = createAction('[Costs Overview] Get Overview');

export const getOverviewSuccess = createAction(
    '[Costs Overview] Get Overview Success',
    props<{ items: CostsOverviewItem[] }>()
);

export const getOverviewError = createAction(
    '[Costs Overview] Get Overview Error',
    props<{ error: HttpErrorResponse }>()
);
