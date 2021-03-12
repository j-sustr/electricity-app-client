import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { GroupsState } from './groups.model';

export const selectGroups = createFeatureSelector<AppState, GroupsState>(
    'groups'
);

export const selectUserGroups = createSelector(
    selectGroups,
    (state: GroupsState) => state.userGroups
);
