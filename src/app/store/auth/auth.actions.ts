import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Auth] Login',
    props<{ username: string; password: string }>()
);

export const loginSuccess = createAction('[Auth] Login Success');

export const loginError = createAction(
    '[Auth] Login Error',
    props<{ error: HttpErrorResponse }>()
);
