import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './router.store';
import { AppState } from '../app-store.state';

export const selectRouterReducerState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
>('router');

export const selectRouterState = createSelector(
    selectRouterReducerState,
    (router) => router && router.state
);

export const selectRouterPath = createSelector(
    selectRouterReducerState,
    (router) => router && router.state.path
);
