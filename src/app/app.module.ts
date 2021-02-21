import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { AppStoreModule } from './ui/store/app-store.module';
import { PowerFactorClient } from './web-api-client';
import { POWER_FACTOR_CLIENT } from './web-api-client-di';

@NgModule({
    declarations: [AppComponent, AppBarComponent],
    imports: [BrowserModule, AppStoreModule, AppRoutingModule],
    providers: [
        {
            provide: POWER_FACTOR_CLIENT,
            useClass: PowerFactorClient
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
