import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { selectGroupId } from '../common/router/router.selectors';
import { GroupsState } from './groups.model';

export interface GroupTreeView {
    items: GroupTreeViewItem[];
    loading: boolean;
}

export interface GroupTreeViewItem {
    id: string;
    text: string;
    expanded?: boolean;
    items?: GroupTreeViewItem[];
}

export const selectGroups = createFeatureSelector<AppState, GroupsState>(
    'groups'
);

export const selectUserGroups = createSelector(
    selectGroups,
    (state: GroupsState) => state.userGroups
);

export const selectSelectedGroupName = createSelector(
    selectGroupId,
    selectUserGroups,
    (groupId, userGroups): string | null => {
        if (groupId && Array.isArray(userGroups)) {
            const g = userGroups.find((g) => g.id === groupId);
            if (g) return g.name;
        }
        return null;
    }
);

export const selectGroupTreeViewItems = createSelector(
    selectUserGroups,
    (userGroups) => {
        if (!userGroups) {
            return null;
        }

        return userGroups.map((g) => {
            return {
                id: g.id,
                text: g.name,
                expanded: false
            } as GroupTreeViewItem;
        });
    }
);

export const selectGroupTreeView = createSelector(
    selectGroups,
    selectGroupTreeViewItems,
    (state, items): GroupTreeView | null => {
        if (!items) {
            if (state.loading) {
                return {
                    items: [],
                    loading: true
                };
            }
            return null;
        }
        return {
            items,
            loading: false
        };
    }
);
