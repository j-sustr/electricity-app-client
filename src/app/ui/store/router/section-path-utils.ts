import * as cdActions from '../costs-detail/costs-detail.actions';
import * as cdSelectors from '../costs-detail/costs-detail.selectors';
import * as coActions from '../costs-overview/costs-overview.actions';
import * as coSelectors from '../costs-overview/costs-overview.selectors';
import * as pfoActions from '../power-factor-overview/power-factor-overview.actions';
import * as pfoSelectors from '../power-factor-overview/power-factor-overview.selectors';
import * as pfdActions from '../power-factor-detail/power-factor-detail.actions';
import * as pfdSelectors from '../power-factor-detail/power-factor-detail.selectors';
import { Action, ActionCreator, Selector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { ViewType } from '../models';

export const SECTION_PATHS = [
    '/costs/overview',
    '/costs/detail/:groupId',
    '/power-factor/overview',
    '/power-factor/detail/:groupId'
] as const;

export type SectionPath = typeof SECTION_PATHS[number];

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
    }
    throw new Error('invalid section path');
}

export function mapSectionPathToViewTypeSelector(
    path: SectionPath
): Selector<AppState, ViewType> {
    switch (path) {
        case '/costs/overview':
        case '/costs/detail/:groupId':
            throw new Error('not implemented');
        case '/power-factor/overview':
            return pfoSelectors.selectViewType;
        case '/power-factor/detail/:groupId':
            return pfdSelectors.selectViewType;
    }
    throw new Error('invalid section path');
}

export function mapSectionPathToSetViewTypeAction(
    path: SectionPath
): ActionCreator {
    switch (path) {
        case '/costs/overview':
        case '/costs/detail/:groupId':
            throw new Error('not implemented');
        case '/power-factor/overview':
            return pfoActions.setViewType;
        case '/power-factor/detail/:groupId':
            return pfdActions.setViewType;
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
