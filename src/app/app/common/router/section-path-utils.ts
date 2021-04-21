import * as cdActions from '../../costs-detail/costs-detail.actions';
import * as cdSelectors from '../../costs-detail/costs-detail.selectors';
import * as coActions from '../../costs-overview/costs-overview.actions';
import * as coSelectors from '../../costs-overview/costs-overview.selectors';
import * as pfoActions from '../../power-factor-overview/power-factor-overview.actions';
import * as pfoSelectors from '../../power-factor-overview/power-factor-overview.selectors';
import * as pfdActions from '../../power-factor-detail/power-factor-detail.actions';
import * as pfdSelectors from '../../power-factor-detail/power-factor-detail.selectors';
import * as pdoActions from '../../peak-demand-overview/peak-demand-overview.actions';
import * as pdoSelectors from '../../peak-demand-overview/peak-demand-overview.selectors';
import * as pddActions from '../../peak-demand-detail/peak-demand-detail.actions';
import * as pddSelectors from '../../peak-demand-detail/peak-demand-detail.selectors';
import { Action, ActionCreator, Selector } from '@ngrx/store';
import { AppState } from '../../app-store.state';
import { ViewType } from '../models';

export const OVERVIEW_SECTION_PATHS = [
    '/costs/overview',
    '/power-factor/overview',
    '/peak-demand/overview'
] as const;

export const DETAIL_SECTION_PATHS = [
    '/costs/detail/:groupId',
    '/power-factor/detail/:groupId',
    '/peak-demand/detail/:groupId'
];

export const SECTION_PATHS = [
    ...OVERVIEW_SECTION_PATHS,
    ...DETAIL_SECTION_PATHS
];

export type OverviewSectionPath = typeof OVERVIEW_SECTION_PATHS[number];
export type DetailSectionPath = typeof DETAIL_SECTION_PATHS[number];
export type SectionPath = typeof SECTION_PATHS[number];

export function isDetailSectionPath(path: string): path is DetailSectionPath {
    return DETAIL_SECTION_PATHS.includes(path as never);
}

export function isSectionPath(path: string): path is SectionPath {
    return SECTION_PATHS.includes(path as never);
}

export function mapSectionPathToGetDataAction(path: SectionPath): Action {
    switch (path) {
        case '/costs/overview':
            return coActions.getOverview();
        case '/costs/detail/:groupId':
            return cdActions.getDetail();
        case '/power-factor/overview':
            return pfoActions.getOverview();
        case '/power-factor/detail/:groupId':
            return pfdActions.getDetail();
        case '/peak-demand/overview':
            return pdoActions.getOverview();
        case '/peak-demand/detail/:groupId':
            return pddActions.getDetail();
    }
    throw new Error('invalid section url');
}

export function mapSectionPathToHasDataSelector(
    path: SectionPath
): Selector<AppState, boolean> {
    switch (path) {
        case '/costs/overview':
            return coSelectors.selectHasData;
        case '/costs/detail/:groupId':
            return cdSelectors.selectHasData;
        case '/power-factor/overview':
            return pfoSelectors.selectHasData;
        case '/power-factor/detail/:groupId':
            return pfdSelectors.selectHasData;
        case '/peak-demand/overview':
            return pdoSelectors.selectHasData;
        case '/peak-demand/detail/:groupId':
            return pddSelectors.selectHasData;
    }
    throw new Error('invalid section path');
}

export function mapSectionPathToViewTypeSelector(
    path: SectionPath
): Selector<AppState, ViewType> {
    switch (path) {
        case '/costs/overview':
        case '/costs/detail/:groupId':
            throw new Error('does not have view type');
        case '/power-factor/overview':
            return pfoSelectors.selectViewType;
        case '/power-factor/detail/:groupId':
            return pfdSelectors.selectViewType;
        case '/peak-demand/overview':
            return pdoSelectors.selectViewType;
        case '/peak-demand/detail/:groupId':
            throw new Error('does not have view type');
    }
    throw new Error('invalid section path');
}

export function mapSectionPathToSetViewTypeAction(
    path: SectionPath
): ActionCreator {
    switch (path) {
        case '/costs/overview':
        case '/costs/detail/:groupId':
            throw new Error(
                'not implemented (mapSectionPathToSetViewTypeAction)'
            );
        case '/power-factor/overview':
            return pfoActions.setViewType;
        case '/power-factor/detail/:groupId':
            return pfdActions.setViewType;
        case '/peak-demand/overview':
            return pdoActions.setViewType;
        case '/peak-demand/detail/:groupId':
            throw new Error('does not have view type');
    }
    throw new Error('invalid section path');
}

export function mapSectionPathToArch(path: SectionPath): number {
    switch (path) {
        case '/costs/overview':
        case '/costs/detail/:groupId':
        case '/power-factor/overview':
        case '/power-factor/detail/:groupId':
            return 6;
    }
    throw new Error('invalid section path');
}
