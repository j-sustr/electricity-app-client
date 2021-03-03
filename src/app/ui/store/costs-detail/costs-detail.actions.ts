import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CostsDetailItem } from './costs-detail.model';

export const getDetail = createAction('[Costs Detail] Get Detail');

export const getDetailSuccess = createAction(
    '[Costs Detail] Get Detail Success',
    props<{
        groupName: string;
        items: CostsDetailItem[];
    }>()
);

export const getDetailError = createAction(
    '[Costs Detail] Get Detail Error',
    props<{ error: HttpErrorResponse }>()
);
