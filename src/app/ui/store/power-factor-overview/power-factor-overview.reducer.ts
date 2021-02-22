import { Action, createReducer, on } from '@ngrx/store';
import {
    actionPFOverviewSetViewType,
    actionPFOverviewToggleEnergy
} from './power-factor-overview.actions';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export const initialState: PowerFactorOverviewState = {
    viewType: 'table',
    showEnergy: false,
    view: {
        data: [],
        series: []
    },
    loading: false,
    error: false
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
    }))
);

export function powerFactorOverviewReducer(
    state: PowerFactorOverviewState | undefined,
    action: Action
): PowerFactorOverviewState {
    return reducer(state, action);
}
