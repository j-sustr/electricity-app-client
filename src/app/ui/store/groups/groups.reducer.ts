import { Action, createReducer, on } from '@ngrx/store';
import {
    getUserGroups,
    getUserGroupsError,
    getUserGroupsSuccess
} from './groups.actions';
import { GroupsState } from './groups.model';

const initialState: GroupsState = {
    userGroups: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(getUserGroups, (state) => ({
        ...state,
        userGroups: null,
        loading: true,
        error: null
    })),
    on(getUserGroupsSuccess, (state, { userGroups }) => ({
        ...state,
        userGroups,
        loading: false,
        error: null
    })),
    on(getUserGroupsError, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);

export function groupsReducer(
    state: GroupsState | undefined,
    action: Action
): GroupsState {
    return reducer(state, action);
}
