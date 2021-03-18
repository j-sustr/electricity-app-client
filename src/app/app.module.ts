import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppErrorHandler } from './core/common/services/app-error-handler';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { AppStoreModule } from './store/app-store.module';
import { HttpErrorInterceptor } from './core/common/http-interceptors/http-error.interceptor';

@NgModule({
    declarations: [AppComponent, AppBarComponent],
    imports: [BrowserModule, AppStoreModule, AppRoutingModule],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        { provide: ErrorHandler, useClass: AppErrorHandler }
    ]
})
export class AppModule {}
