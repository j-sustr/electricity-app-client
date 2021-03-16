import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PowerFactorDistributionItem } from 'src/app/web-api-client';

export const setViewType = createAction(
    '[Power Factor Detail] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const toggleEnergy = createAction('[Power Factor Detail] Toggle Energy');

export const getDetail = createAction('[Power Factor Detail] Get Detail');

export const getDistribution = createAction(
    '[Power Factor Detail] Get Distribution'
);

export const getDistributionSuccess = createAction(
    '[Power Factor Detail] Get Distribution Success',
    props<{
        groupName: string;
        items1: PowerFactorDistributionItem[];
        items2: PowerFactorDistributionItem[] | null;
    }>()
);

export const getDistributionError = createAction(
    '[Power Factor Detail] Get Distribution Error',
    props<{ error: HttpErrorResponse }>()
);
