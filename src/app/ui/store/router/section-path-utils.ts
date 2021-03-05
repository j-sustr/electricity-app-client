import * as cdActions from '../costs-detail/costs-detail.actions';
import { selectCostsDetailHasData } from '../costs-detail/costs-detail.selectors';
import * as coActions from '../costs-overview/costs-overview.actions';
import { selectCostsOverviewHasData } from '../costs-overview/costs-overview.selectors';
import * as pfoActions from '../power-factor-overview/power-factor-overview.actions';
import * as pfoSelectors from '../power-factor-overview/power-factor-overview.selectors';
import * as pfdActions from '../power-factor-detail/power-factor-detail.actions';
import * as pfdSelectors from '../power-factor-detail/power-factor-detail.selectors';
import { selectHasData } from '../power-factor-overview/power-factor-overview.selectors';
import { Action, ActionCreator, Selector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { ViewType } from '../models';

export const SECTION_PATHS = [
    '/costs/overview',
    '/costs/overview',
    '/costs/detail',
    '/power-factor/overview',
    '/power-factor/detail'
] as const;

export type SectionPath = typeof SECTION_PATHS[number];

export function isSectionPath(path: string): path is SectionPath {
    return SECTION_PATHS.includes(path as never);
}

export function mapSectionPathToGetDataAction(path: SectionPath): Action {
    switch (path) {
        case '/costs/overview':
            return coActions.getOverview();
        case '/costs/detail':
            return cdActions.getDetail();
        case '/power-factor/overview':
            return pfoActions.getOverview();
        case '/power-factor/detail':
            return pfoActions.getOverview();
    }
    throw new Error('invalid section url');
}

export function mapSectionPathToHasDataSelector(
    path: SectionPath
): Selector<AppState, boolean> {
    switch (path) {
        case '/costs/overview':
            return selectCostsOverviewHasData;
        case '/costs/detail':
            return selectCostsDetailHasData;
        case '/power-factor/overview':
            return selectHasData;
    }
    throw new Error('invalid section path');
}

export function mapRoutePathToViewTypeSelector(
    path: SectionPath
): Selector<AppState, ViewType> {
    switch (path) {
        case '/costs/overview':
        case '/costs/detail':
            throw new Error('not implemented');
        case '/power-factor/overview':
            return pfoSelectors.selectViewType;
        case '/power-factor/detail':
            return pfdSelectors.selectViewType;
    }
    throw new Error('invalid section path');
}

export function mapRoutePathToSetViewTypeAction(
    path: SectionPath
): ActionCreator {
    switch (path) {
        case '/costs/overview':
        case '/costs/detail':
            throw new Error('not implemented');
        case '/power-factor/overview':
            return pfoActions.setViewType;
        case '/power-factor/detail':
            return pfdActions.setViewType;
    }
    throw new Error('invalid section path');
}
