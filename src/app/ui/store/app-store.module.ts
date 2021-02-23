import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PowerFactorClient } from 'src/app/web-api-client';
import { POWER_FACTOR_CLIENT } from 'src/app/web-api-client-di';
import { environment } from 'src/environments/environment';
import { reducers } from './app-store.state';
import { DataSourceEffects } from './data-source/data-source.effects';
import { PowerFactorOverviewEffects } from './power-factor-overview/power-factor-overview.effects';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([DataSourceEffects, PowerFactorOverviewEffects]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                  name: 'ElectricityApp'
              })
    ],
    exports: [StoreModule],
    providers: [
        {
            provide: POWER_FACTOR_CLIENT,
            useClass: PowerFactorClient
        }
    ]
})
export class AppStoreModule {}
