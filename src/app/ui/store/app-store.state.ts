import { ActionReducerMap } from '@ngrx/store';
import { CostsOverviewState } from './costs-overview/costs-overview.model';
import { costsOverviewReducer } from './costs-overview/costs-overview.reducer';
import { CostsState } from './costs/costs.model';
import { costsReducer } from './costs/costs.reducer';
import {
    dataSourceReducer,
    DataSourceState
} from './data-source/data-source.reducer';
import { PowerFactorOverviewState } from './power-factor-overview/power-factor-overview.model';
import { powerFactorOverviewReducer } from './power-factor-overview/power-factor-overview.reducer';

export interface AppState {
    dataSource: DataSourceState;
    costs: CostsState;
    costsOverview: CostsOverviewState;
    powerFactorOverview: PowerFactorOverviewState;
}

export const reducers: ActionReducerMap<AppState> = {
    dataSource: dataSourceReducer,
    costs: costsReducer,
    costsOverview: costsOverviewReducer,
    powerFactorOverview: powerFactorOverviewReducer
};
