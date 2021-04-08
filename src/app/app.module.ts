import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './app/common/http-interceptors/http-error.interceptor';
import { AppErrorHandler } from './app/common/error-handler/app-error-handler';
import { AppStoreModule } from './app/app-store.module';
import { AppBarModule } from './ui/components/app-bar/app-bar.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppBarModule, AppStoreModule, AppRoutingModule],
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
