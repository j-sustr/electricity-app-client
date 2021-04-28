import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IAuthClient, LoginCredentials } from 'src/app/web-api-client';
import { AUTH_CLIENT } from 'src/app/web-api-client-di';
import {
    getCurrentUser,
    getCurrentUserError,
    getCurrentUserSuccess,
    login,
    loginError,
    loginSuccess,
    logout,
    logoutError,
    logoutSuccess
} from './auth.actions';

@Injectable()
export class AuthEffects {
    getCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCurrentUser),
            switchMap(() =>
                this.authClient.getCurrentUser().pipe(
                    map((userDto) => {
                        const user = userDto
                            ? {
                                  username: userDto.username ?? '(no name)'
                              }
                            : null;
                        return getCurrentUserSuccess({
                            user
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            getCurrentUserError({
                                error
                            })
                        )
                    )
                )
            )
        )
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap(({ username, password }) =>
                this.authClient
                    .login(
                        new LoginCredentials({
                            username,
                            password
                        })
                    )
                    .pipe(
                        map((userDto) => {
                            void this.router.navigate(['']);
                            return loginSuccess({
                                user: {
                                    username: userDto.username ?? '(no name)'
                                }
                            });
                        }),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                loginError({
                                    error
                                })
                            )
                        )
                    )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            switchMap(() =>
                this.authClient.logout().pipe(
                    map(() => {
                        setTimeout(() => {
                            this.zone.run(() => {
                                void this.router.navigate(['/login']);
                            });
                        }, 0);
                        return logoutSuccess();
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            logoutError({
                                error
                            })
                        )
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        @Inject(AUTH_CLIENT)
        private authClient: IAuthClient,
        private router: Router,
        private zone: NgZone
    ) {}
}
