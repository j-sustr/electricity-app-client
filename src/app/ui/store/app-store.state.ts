import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { CostsDetailState } from './costs-detail/costs-detail.model';
import { costsDetailReducer } from './costs-detail/costs-detail.reducer';
import { CostsOverviewState } from './costs-overview/costs-overview.model';
import { costsOverviewReducer } from './costs-overview/costs-overview.reducer';
import { CostsState } from './costs/costs.model';
import { costsReducer } from './costs/costs.reducer';
import { DataSourceState } from './data-source/data-source.model';
import { dataSourceReducer } from './data-source/data-source.reducer';
import { PowerFactorDetailState } from './power-factor-detail/power-factor-detail.model';
import { powerFactorDetailReducer } from './power-factor-detail/power-factor-detail.reducer';
import { PowerFactorOverviewState } from './power-factor-overview/power-factor-overview.model';
import { powerFactorOverviewReducer } from './power-factor-overview/power-factor-overview.reducer';
import { RouterStateUrl } from './router/router.store';

export interface AppState {
    dataSource: DataSourceState;
    costs: CostsState;
    costsOverview: CostsOverviewState;
    costsDetail: CostsDetailState;
    powerFactorOverview: PowerFactorOverviewState;
    powerFactorDetail: PowerFactorDetailState;
    router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
    dataSource: dataSourceReducer,
    costs: costsReducer,
    costsOverview: costsOverviewReducer,
    costsDetail: costsDetailReducer,
    powerFactorOverview: powerFactorOverviewReducer,
    powerFactorDetail: powerFactorDetailReducer,
    router: routerReducer
};
