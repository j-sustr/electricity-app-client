import { Action, createReducer, on } from '@ngrx/store';
import {
    setCustomerParams,
    setIsCustomerParamsPopupFormOpen
} from './costs.actions';
import { CostsState } from './costs.model';

const initialState: CostsState = {
    customerParams: null,
    isCustomerParamsPopupFormOpen: false
};

const reducer = createReducer(
    initialState,
    on(setCustomerParams, (state, { params }) => ({
        ...state,
        customerParams: params
    })),
    on(setIsCustomerParamsPopupFormOpen, (state, { open }) => ({
        ...state,
        isCustomerParamsPopupFormOpen: open
    }))
);

export function costsReducer(
    state: CostsState | undefined,
    action: Action
): CostsState {
    return reducer(state, action);
}
