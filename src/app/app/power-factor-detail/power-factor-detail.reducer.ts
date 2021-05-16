import { Action, createReducer, on } from '@ngrx/store';
import { last } from 'lodash-es';
import {
    popDistributionStack,
    getDistribution,
    getDistributionError,
    getDistributionSuccess,
    getRangeDistribution,
    setViewType,
    toggleEnergy
} from './power-factor-detail.actions';
import { PowerFactorDetailState } from './power-factor-detail.model';
import { getDistributionRange } from './power-factor-distribution-utils';

export const initialState: PowerFactorDetailState = {
    detailType: 'distribution',
    viewType: 'chart',
    showEnergy: false,
    distributionStack: null,
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
        distributionStack: null,
        loading: true,
        error: null
    })),
    on(getRangeDistribution, (state, action) => ({
        ...state,
        distributionStack: [
            ...(state.distributionStack ?? []),
            {
                items1: null,
                items2: null,
                range: getDistributionRange(action)
            }
        ],
        loading: true,
        error: null
    })),
    on(getDistributionSuccess, (state, action) => ({
        ...state,
        distributionStack: [
            ...(state.distributionStack?.slice(0, -1) ?? []),
            {
                items1: action.items1,
                items2: action.items2,
                range: last(state.distributionStack)?.range ?? null
            }
        ],
        interval1: action.interval1,
        interval2: action.interval2,
        loading: false,
        error: null
    })),
    on(getDistributionError, (state, { error }) => ({
        ...state,
        distributionStack: null,
        loading: false,
        error
    })),
    on(popDistributionStack, (state) => ({
        ...state,
        distributionStack: [...(state.distributionStack?.slice(0, -1) ?? [])]
    }))
);

export function powerFactorDetailReducer(
    state: PowerFactorDetailState | undefined,
    action: Action
): PowerFactorDetailState {
    return reducer(state, action);
}
