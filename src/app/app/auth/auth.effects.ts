import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUserClient } from 'src/app/web-api-client';
import { USER_CLIENT } from 'src/app/web-api-client-di';
import {
    getCurrentUser,
    getCurrentUserError,
    getCurrentUserSuccess,
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
                this.userClient.getCurrentUser().pipe(
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
            ofType(logout),
            switchMap(() =>
                this.userClient.logout().pipe(
                    map(() => {
                        void this.router.navigate(['']);
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

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            switchMap(({ username, password }) =>
                this.userClient.login(username, password).pipe(
                    map(() => {
                        void this.router.navigate(['']);
                        return loginSuccess({
                            username
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

    constructor(
        private actions$: Actions,
        @Inject(USER_CLIENT)
        private userClient: IUserClient,
        private router: Router
    ) {}
}
