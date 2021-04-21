import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getIntervalsOverlap } from 'src/app/common/temporal/interval/intervals-overlap';
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
    selected?: boolean;
    items?: GroupInfoView[];
}

export const selectGroups = createFeatureSelector<AppState, GroupsState>(
    'groups'
);

export const selectUserGroupTree = createSelector(
    selectGroups,
    (state: GroupsState) => state.userGroupTree
);

export const selectUserRecordGroupsInterval = createSelector(
    selectUserGroupTree,
    (groupTree): Interval | null => {
        if (!groupTree) return null;
        const infos = getRecordGroupInfos(groupTree);
        const ranges = getAllRangesFromGroupInfos(infos);
        return getIntervalsOverlap(ranges);
    }
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

export const selectSelectedGroupName = createSelector(
    selectSelectedGroup,
    (group) => group?.name ?? null
);

export const selectGroupTreeView = createSelector(
    selectGroups,
    selectUserGroupTree,
    selectGroupId,
    (state, tree, selectedId): GroupTreeView => {
        const root = tree ? createGroupInfoView(tree, selectedId) : null;
        return {
            items: root?.items ?? null,
            loading: state.loading
        };
    }
);

function createGroupInfoView(
    info: GroupInfo,
    selectedId?: string
): GroupInfoView {
    return {
        id: info.id,
        text: info.name,
        expanded: true,
        selected: info.id === selectedId,
        items: info.subgroups?.map((g) => createGroupInfoView(g, selectedId))
    };
}

function flattenGroupInfoTree(groupInfo: GroupInfo): GroupInfo[] {
    const arr = groupInfo.subgroups?.map((g) => flattenGroupInfoTree(g)) ?? [];
    const flatArr = arr.flat();
    return [groupInfo, ...flatArr];
}

function getRecordGroupInfos(groupInfo: GroupInfo): GroupInfo[] {
    function _getRecordGroupInfos(groupInfo: GroupInfo, infos: GroupInfo[]) {
        if (Array.isArray(groupInfo.archives)) {
            infos.push(groupInfo);
            return infos;
        }
        if (Array.isArray(groupInfo.subgroups)) {
            for (const grp of groupInfo.subgroups) {
                _getRecordGroupInfos(grp, infos);
            }
        }
        return infos;
    }
    return _getRecordGroupInfos(groupInfo, []);
}

function getAllRangesFromGroupInfos(infos: GroupInfo[]): Interval[] {
    return infos
        .map((info) => {
            if (info && info.archives) {
                return info.archives
                    .map((arch) => {
                        if (arch && arch.range) {
                            return arch.range;
                        }
                        return null;
                    })
                    .filter((range) => range !== null) as Interval[];
            }
            return null;
        })
        .filter((ranges) => ranges !== null)
        .flat() as Interval[];
}
