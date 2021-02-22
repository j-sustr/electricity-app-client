import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PowerFactorClient } from 'src/app/web-api-client';
import { POWER_FACTOR_CLIENT } from 'src/app/web-api-client-di';
import { reducers } from './app-store.state';
import { DataSourceEffects } from './data-source/data-source.effects';
import { PowerFactorOverviewEffects } from './power-factor-overview/power-factor-overview.effects';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([DataSourceEffects, PowerFactorOverviewEffects])
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
