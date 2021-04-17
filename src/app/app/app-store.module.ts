import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
    RouterStateSerializer,
    StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
    AuthClient,
    CostsClient,
    DataSourceClient,
    GroupsClient,
    PeakDemandClient,
    PowerFactorClient
} from 'src/app/web-api-client';
import {
    AUTH_CLIENT,
    COSTS_CLIENT,
    DATA_SOURCE_CLIENT,
    GROUPS_CLIENT,
    PEAK_DEMAND_CLIENT,
    POWER_FACTOR_CLIENT
} from 'src/app/web-api-client-di';
import { environment } from 'src/environments/environment';
import { reducers } from './app-store.state';
import { AuthEffects } from './auth/auth.effects';
import { CostsDetailEffects } from './costs-detail/costs-detail.effects';
import { CostsOverviewEffects } from './costs-overview/costs-overview.effects';
import { DataSourceEffects } from './data-source/data-source.effects';
import { GroupsEffects } from './groups/groups.effects';
import { PowerFactorDetailEffects } from './power-factor-detail/power-factor-detail.effects';
import { PowerFactorDistributionEffects } from './power-factor-detail/power-factor-distribution.effects';
import { PowerFactorOverviewEffects } from './power-factor-overview/power-factor-overview.effects';
import { CustomRouterSerializer } from './common/router/custom-router-serializer';

// function apiBaseUrlFactory(): string | undefined {
//     const url = 'https://localhost:44312';
//     return environment.production ? undefined : url;
// }

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([
            AuthEffects,
            DataSourceEffects,
            GroupsEffects,
            CostsOverviewEffects,
            CostsDetailEffects,
            PowerFactorOverviewEffects,
            PowerFactorDetailEffects,
            PowerFactorDistributionEffects
        ]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                  name: 'ElectricityApp'
              })
    ],
    exports: [StoreModule],
    providers: [
        {
            provide: AUTH_CLIENT,
            useClass: AuthClient
        },
        {
            provide: DATA_SOURCE_CLIENT,
            useClass: DataSourceClient
        },
        {
            provide: GROUPS_CLIENT,
            useClass: GroupsClient
        },
        {
            provide: COSTS_CLIENT,
            useClass: CostsClient
        },
        {
            provide: POWER_FACTOR_CLIENT,
            useClass: PowerFactorClient
        },
        {
            provide: PEAK_DEMAND_CLIENT,
            useClass: PeakDemandClient
        },
        // {
        //     provide: API_BASE_URL,
        //     useFactory: apiBaseUrlFactory
        // },
        { provide: RouterStateSerializer, useClass: CustomRouterSerializer }
    ]
})
export class AppStoreModule {}
