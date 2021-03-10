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
    API_BASE_URL,
    CostsClient,
    DataSourceClient,
    PowerFactorClient
} from 'src/app/web-api-client';
import {
    COSTS_CLIENT,
    DATA_SOURCE_CLIENT,
    POWER_FACTOR_CLIENT
} from 'src/app/web-api-client-di';
import { environment } from 'src/environments/environment';
import { reducers } from './app-store.state';
import { CostsOveviewEffects } from './costs-overview/costs-overview.effects';
import { DataSourceEffects } from './data-source/data-source.effects';
import { PowerFactorDetailEffects } from './power-factor-detail/power-factor-detail.effects';
import { PowerFactorDistributionEffects } from './power-factor-detail/power-factor-distribution.effects';
import { PowerFactorOverviewEffects } from './power-factor-overview/power-factor-overview.effects';
import { CustomRouterSerializer } from './router/custom-router-serializer';

function apiBaseUrlFactory(): string | undefined {
    const url = 'https://localhost:44312';
    return environment.production ? undefined : url;
}

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([
            DataSourceEffects,
            CostsOveviewEffects,
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
            provide: DATA_SOURCE_CLIENT,
            useClass: DataSourceClient
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
            provide: API_BASE_URL,
            useFactory: apiBaseUrlFactory
        },
        { provide: RouterStateSerializer, useClass: CustomRouterSerializer }
    ]
})
export class AppStoreModule {}
