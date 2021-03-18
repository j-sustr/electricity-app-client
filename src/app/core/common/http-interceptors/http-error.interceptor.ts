import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            tap({
                error: (err: unknown) => {
                    if (err instanceof HttpErrorResponse) {
                        const appErrorHandler = this.injector.get(ErrorHandler);
                        appErrorHandler.handleError(err);
                    }
                }
            })
        );
    }
}
