import { AuthState } from './auth.model';
import { createReducer, on, Action } from '@ngrx/store';
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

export const initialState: AuthState = {
    user: null,
    loading: false
};

const reducer = createReducer(
    initialState,
    on(getCurrentUser, (state) => ({
        ...state,
        user: null,
        loading: true,
        error: undefined
    })),
    on(getCurrentUserSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false
    })),
    on(getCurrentUserError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(login, (state) => ({
        ...state,
        user: null,
        loading: true,
        error: undefined
    })),
    on(loginSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false
    })),
    on(loginError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(logout, (state) => ({
        ...state,
        loading: true,
        error: undefined
    })),
    on(logoutSuccess, (state) => ({
        ...state,
        user: null,
        loading: false
    })),
    on(logoutError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);

export function authReducer(
    state: AuthState | undefined,
    action: Action
): AuthState {
    return reducer(state, action);
}
