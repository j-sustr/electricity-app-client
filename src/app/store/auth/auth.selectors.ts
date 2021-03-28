import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { AuthState } from './auth.model';

export const selectAuth = createFeatureSelector<AppState, AuthState>('auth');

export const selectIsAuthenticated = createSelector(
    selectAuth,
    (state: AuthState) => state.isAuthenticated
);
