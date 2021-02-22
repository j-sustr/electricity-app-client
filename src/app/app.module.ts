import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { AppStoreModule } from './ui/store/app-store.module';

@NgModule({
    declarations: [AppComponent, AppBarComponent],
    imports: [BrowserModule, AppStoreModule, AppRoutingModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
