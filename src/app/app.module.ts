import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatetimeRangeComparisonInputComponent } from './ui/components/datetime-range-comparison-input/datetime-range-comparison-input.component';
import { DatetimeRangeInputComponent } from './ui/components/datetime-range-comparison-input/datetime-range-input/datetime-range-input.component';

@NgModule({
    declarations: [
        AppComponent,
        DatetimeRangeComparisonInputComponent,
        DatetimeRangeInputComponent
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
