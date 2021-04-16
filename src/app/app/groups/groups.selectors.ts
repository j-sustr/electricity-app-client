import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { selectGroupId } from '../common/router/router.selectors';
import { GroupInfo, GroupsState } from './groups.model';

export interface GroupTreeView {
    items: GroupInfoView[] | null;
    loading: boolean;
}

export interface GroupInfoView {
    id: string;
    text: string;
    expanded?: boolean;
    items?: GroupInfoView[];
}

export const selectGroups = createFeatureSelector<AppState, GroupsState>(
    'groups'
);

export const selectUserGroupTree = createSelector(
    selectGroups,
    (state: GroupsState) => state.userGroupTree
);

export const selectSelectedGroup = createSelector(
    selectGroupId,
    selectUserGroupTree,
    (groupId, groupTree): GroupInfo | null => {
        if (!groupTree) return null;
        const groupArr = flattenGroupInfoTree(groupTree);
        const selectedGroup = groupArr.find((g) => g.id === groupId);
        return selectedGroup ?? null;
    }
);

export const selectGroupTreeView = createSelector(
    selectGroups,
    selectUserGroupTree,
    (state, tree): GroupTreeView => {
        const root = tree ? createGroupInfoView(tree) : null;
        return {
            items: root?.items ?? null,
            loading: state.loading
        };
    }
);

function createGroupInfoView(info: GroupInfo): GroupInfoView {
    return {
        id: info.id,
        text: info.name,
        expanded: true,
        items: info.subgroups?.map((g) => createGroupInfoView(g))
    };
}

function flattenGroupInfoTree(groupInfo: GroupInfo): GroupInfo[] {
    const arr = groupInfo.subgroups?.map((g) => flattenGroupInfoTree(g)) ?? [];
    const flatArr = arr.flat();
    return [groupInfo, ...flatArr];
}
