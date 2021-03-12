import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CostlyQuantitiesDetailItem } from 'src/app/web-api-client';

export const getDetail = createAction('[Costs Detail] Get Detail');

export const getDetailSuccess = createAction(
    '[Costs Detail] Get Detail Success',
    props<{
        groupName: string;
        items1: CostlyQuantitiesDetailItem[];
        items2: CostlyQuantitiesDetailItem[] | null;
    }>()
);

export const getDetailError = createAction(
    '[Costs Detail] Get Detail Error',
    props<{ error: HttpErrorResponse }>()
);
