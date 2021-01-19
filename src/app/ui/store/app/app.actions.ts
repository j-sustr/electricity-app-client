import { createAction, props } from '@ngrx/store';

export const actionSetInterval = createAction(
  '[App] Set Interval',
  props<{
    index: 0 | 1;
    start: Date;
    end: Date;
  }>()
);
