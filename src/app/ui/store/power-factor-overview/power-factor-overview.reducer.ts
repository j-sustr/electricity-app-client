import { Action, createReducer, on } from '@ngrx/store';
import {
    actionPowerFactorOverviewGetData as actionPowerFactorOverviewGetData,
    actionPowerFactorOverviewGetDataSuccess as actionPowerFactorOverviewGetDataSuccess,
    actionPFOverviewSetViewType,
    actionPFOverviewToggleEnergy,
    actionPowerFactorOverviewGetDataError
} from './power-factor-overview.actions';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export const initialState: PowerFactorOverviewState = {
    viewType: 'table',
    showEnergy: false,
    items: [],
    series: [],
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(actionPFOverviewSetViewType, (state, action) => ({
        ...state,
        viewType: action.viewType
    })),
    on(actionPFOverviewToggleEnergy, (state) => ({
        ...state,
        showEnergy: !state.showEnergy
    })),
    on(actionPowerFactorOverviewGetData, (state) => ({
        ...state,
        items: null,
        series: null,
        loading: true,
        error: null
    })),
    on(actionPowerFactorOverviewGetDataSuccess, (state, { dto }) => ({
        ...state,
        items: dto?.data?.[0].items ?? null,
        series: null,
        loading: false,
        error: null
    })),
    on(actionPowerFactorOverviewGetDataError, (state, { error }) => ({
        ...state,
        items: null,
        series: null,
        loading: false,
        error
    }))
);

export function powerFactorOverviewReducer(
    state: PowerFactorOverviewState | undefined,
    action: Action
): PowerFactorOverviewState {
    return reducer(state, action);
}
