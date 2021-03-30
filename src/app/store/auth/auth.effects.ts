import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/infrastructure/local-storage/local-storage.service';
import { IUserClient } from 'src/app/web-api-client';
import { USER_CLIENT } from 'src/app/web-api-client-di';
import { login, loginError, loginSuccess } from './auth.actions';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap(({ username, password }) =>
                this.userClient.login(username, password).pipe(
                    map(() => {
                        this.localStorageService.setItem(AUTH_KEY, {
                            isAuthenticated: true
                        });
                        return loginSuccess();
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
        private localStorageService: LocalStorageService,
        private router: Router
    ) {}
}
