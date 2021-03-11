import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { CostsState } from './costs.model';

export const selectCosts = createFeatureSelector<AppState, CostsState>('costs');

export const selectCustomerParams = createSelector(
    selectCosts,
    (state: CostsState) => state.customerParams
);

export const selectHasCustomerParams = createSelector(
    selectCosts,
    (state: CostsState) => state.customerParams !== null
);
