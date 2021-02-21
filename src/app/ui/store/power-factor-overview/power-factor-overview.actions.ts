import { createAction, props } from '@ngrx/store';

export const actionPFOverviewSetViewType = createAction(
    '[Power Factor Overview] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const actionPFOverviewToggleEnergy = createAction(
    '[Power Factor Overview] Toggle Energy'
);
