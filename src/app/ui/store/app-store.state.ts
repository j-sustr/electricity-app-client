import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from './router/router.store';
import { CostsDetailState } from './costs-detail/costs-detail.model';
import { costsDetailReducer } from './costs-detail/costs-detail.reducer';
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
    costsDetail: CostsDetailState;
    powerFactorOverview: PowerFactorOverviewState;
    router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
    dataSource: dataSourceReducer,
    costs: costsReducer,
    costsOverview: costsOverviewReducer,
    costsDetail: costsDetailReducer,
    powerFactorOverview: powerFactorOverviewReducer,
    router: routerReducer
};
