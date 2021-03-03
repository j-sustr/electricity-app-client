import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './ui/common/http-interceptors/http-error.interceptor';
import { AppErrorHandler } from './ui/common/services/app-error-handler';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { AppStoreModule } from './ui/store/app-store.module';

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
