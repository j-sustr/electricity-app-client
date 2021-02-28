import { Action, createReducer, on } from '@ngrx/store';
import { setCustomerParams } from './costs.actions';
import { CostsState } from './costs.model';

const initialState: CostsState = {
    customerParams: null
};

const reducer = createReducer(
    initialState,
    on(setCustomerParams, (state, action) => ({
        ...state,
        customerParams: action.customerParams
    }))
);

export function costsReducer(
    state: CostsState | undefined,
    action: Action
): CostsState {
    return reducer(state, action);
}
