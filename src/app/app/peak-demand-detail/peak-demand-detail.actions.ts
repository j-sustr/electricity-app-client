import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PeakDemandDetailData } from 'src/app/web-api-client';

export const setViewType = createAction(
    '[Peak Demand Detail] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const getDetail = createAction('[Peak Demand Detail] Get Detail');

export const getDetailSuccess = createAction(
    '[Peak Demand Detail] Get Detail Success',
    props<{
        groupName: string;
        data1: PeakDemandDetailData;
        data2: PeakDemandDetailData | null;
    }>()
);

export const getDetailError = createAction(
    '[Peak Demand Detail] Get Detail Error',
    props<{ error: HttpErrorResponse }>()
);
