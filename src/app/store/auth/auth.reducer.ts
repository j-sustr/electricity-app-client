import { AuthState } from './auth.model';
import { createReducer, on, Action } from '@ngrx/store';
import { login, loginError, loginSuccess } from './auth.actions';

export const initialState: AuthState = {
    isAuthenticated: false,
    username: '',
    loading: false
};

const reducer = createReducer(
    initialState,
    on(login, (state) => ({
        ...state,
        isAuthenticated: false,
        loading: true,
        error: undefined
    })),
    on(loginSuccess, (state) => ({
        ...state,
        isAuthenticated: true,
        loading: false
    })),
    on(loginError, (state, { error }) => ({
        ...state,
        isAuthenticated: false,
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
