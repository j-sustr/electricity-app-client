import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from '../../router/router.state';
import { AppState } from '../app-store.state';

export const selectRouterState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
>('router');
