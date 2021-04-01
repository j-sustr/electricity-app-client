import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

export const getCurrentUser = createAction('[Auth] Get Current User');

export const getCurrentUserSuccess = createAction(
    '[Auth] Get Current User Success',
    props<{ user: User | null }>()
);

export const getCurrentUserError = createAction(
    '[Auth] Get Current User Error',
    props<{ error: HttpErrorResponse }>()
);

export const login = createAction(
    '[Auth] Login',
    props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User }>()
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
