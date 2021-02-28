import { createAction, props } from '@ngrx/store';

export const setViewType = createAction(
    '[Power Factor Detail] Set View Type',
    props<{ viewType: 'table' | 'chart' }>()
);

export const toggleEnergy = createAction('[Power Factor Detail] Toggle Energy');

export const getDetail = createAction('[Power Factor Detail] Get Detail');
