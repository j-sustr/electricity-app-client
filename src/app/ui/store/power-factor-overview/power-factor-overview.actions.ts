import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PowerFactorOverviewDto } from 'src/app/web-api-client';

export const actionPFOverviewSetViewType = createAction(
    '[Power Factor Overview] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const actionPFOverviewToggleEnergy = createAction(
    '[Power Factor Overview] Toggle Energy'
);

export const actionPowerFactorOverviewGetData = createAction(
    '[Power Factor Overview] Get Data'
);

export const actionPowerFactorOverviewGetDataSuccess = createAction(
    '[Power Factor Overview] Get Data Success',
    props<{ dto: PowerFactorOverviewDto }>()
);

export const actionPowerFactorOverviewGetDataError = createAction(
    '[Power Factor Overview] Get Data Error',
    props<{ error: HttpErrorResponse }>()
);
