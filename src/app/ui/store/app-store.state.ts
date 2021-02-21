import { ActionReducerMap } from '@ngrx/store';
import {
    dataSourceReducer,
    DataSourceState
} from './data-source/data-source.reducer';
import { PowerFactorOverviewState } from './power-factor-overview/power-factor-overview.model';
import { powerFactorOverviewReducer } from './power-factor-overview/power-factor-overview.reducer';

export interface AppState {
    dataSource: DataSourceState;
    powerFactorOverview: PowerFactorOverviewState;
}

export const reducers: ActionReducerMap<AppState> = {
    dataSource: dataSourceReducer,
    powerFactorOverview: powerFactorOverviewReducer
};
