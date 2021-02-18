import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { DatetimeRangePickerModule } from './ui/components/datetime-range-picker/datetime-range-picker.module';
import { PowerFactorClient } from './web-api-client';
import { POWER_FACTOR_CLIENT } from './web-api-client-di';

@NgModule({
    declarations: [AppComponent, AppBarComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        DatetimeRangePickerModule
    ],
    providers: [
        {
            provide: POWER_FACTOR_CLIENT,
            useClass: PowerFactorClient
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
