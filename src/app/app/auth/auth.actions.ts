import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const getCurrentUser = createAction('[Auth] Get Current User');

export const getCurrentUserSuccess = createAction(
    '[Auth] Get Current User Success',
    props<{ username: string }>()
);

export const getCurrentUserError = createAction(
    '[Auth] Get Current User',
    props<{ error: HttpErrorResponse }>()
);

export const login = createAction(
    '[Auth] Login',
    props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ username: string }>()
);

export const loginError = createAction(
    '[Auth] Login Error',
    props<{ error: HttpErrorResponse }>()
);

export const logout = createAction(
    '[Auth] Logout',
    props<{ username: string; password: string }>()
);

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutError = createAction(
    '[Auth] Logout Error',
    props<{ error: HttpErrorResponse }>()
);
