import { createAction, props } from '@ngrx/store';
import { PowerFactorOverviewDto } from 'src/app/web-api-client';

export const actionPFOverviewSetViewType = createAction(
    '[Power Factor Overview] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const actionPFOverviewToggleEnergy = createAction(
    '[Power Factor Overview] Toggle Energy'
);

export const actionGetPowerFactorOverviewData = createAction(
    '[Power Factor Overview] Get Data',
    props<{ interval1: Interval; interval2: Interval }>()
);

export const actionGetPowerFactorOverviewDataSuccess = createAction(
    '[Power Factor Overview] Get Data Success',
    props<{ dto: PowerFactorOverviewDto }>()
);

export const actionGetPowerFactorOverviewDataError = createAction(
    '[Power Factor Overview] Get Data Error',
    props<{ error: unknown }>()
);
