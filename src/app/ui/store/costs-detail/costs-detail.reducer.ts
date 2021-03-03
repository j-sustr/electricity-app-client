import { Action, createReducer, on } from '@ngrx/store';
import { CostsDetailState } from './costs-detail.model';
import * as actions from './costs-detail.actions';

export const initialState: CostsDetailState = {
    groupName: null,
    items: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(actions.getDetail, (state) => ({
        ...state,
        items: null,
        loading: true,
        error: null
    })),
    on(actions.getDetailSuccess, (state, { groupName, items }) => ({
        ...state,
        groupName,
        items,
        loading: false,
        error: null
    })),
    on(actions.getDetailError, (state, { error }) => ({
        ...state,
        items: null,
        loading: false,
        error
    }))
);

export function costsDetailReducer(
    state: CostsDetailState | undefined,
    action: Action
): CostsDetailState {
    return reducer(state, action);
}
