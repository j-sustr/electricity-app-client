import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CostsDetailItem } from './costs-detail.model';

export const getDetail = createAction('[Costs Detail] Get Detail');

export const getOverviewSuccess = createAction(
    '[Costs Overview] Get Overview Success',
    props<{
        groupName: string;
        items: CostsDetailItem[];
    }>()
);

export const getOverviewError = createAction(
    '[Costs Overview] Get Overview Error',
    props<{ error: HttpErrorResponse }>()
);
