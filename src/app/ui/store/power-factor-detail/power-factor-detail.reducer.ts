import { Action, createReducer, on } from '@ngrx/store';
import {
    getDistribution,
    getDistributionError,
    getDistributionSuccess,
    setViewType,
    toggleEnergy
} from './power-factor-detail.actions';
import { PowerFactorDetailState } from './power-factor-detail.model';

export const initialState: PowerFactorDetailState = {
    detailType: 'distribution',
    viewType: 'table',
    showEnergy: false,
    distribution: {
        items1: null,
        items2: null
    },
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(setViewType, (state, action) => ({
        ...state,
        viewType: action.viewType
    })),
    on(toggleEnergy, (state) => ({
        ...state,
        showEnergy: !state.showEnergy
    })),
    on(getDistribution, (state) => ({
        ...state,
        distribution: null,
        loading: true,
        error: null
    })),
    on(getDistributionSuccess, (state, { items1, items2 }) => ({
        ...state,
        distribution: {
            items1,
            items2
        },
        loading: false,
        error: null
    })),
    on(getDistributionError, (state, { error }) => ({
        ...state,
        distribution: null,
        loading: false,
        error
    }))
);

export function powerFactorDetailReducer(
    state: PowerFactorDetailState | undefined,
    action: Action
): PowerFactorDetailState {
    return reducer(state, action);
}
