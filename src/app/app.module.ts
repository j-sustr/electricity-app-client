import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './core/common/http-interceptors/http-error.interceptor';
import { AppErrorHandler } from './core/common/services/app-error-handler';
import { AppStoreModule } from './store/app-store.module';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { UnauthenticatedContentModule } from './ui/unauthenticated-content/unauthenticated-content.module';

@NgModule({
    declarations: [AppComponent, AppBarComponent],
    imports: [
        BrowserModule,
        UnauthenticatedContentModule,
        AppStoreModule,
        AppRoutingModule
    ],
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
