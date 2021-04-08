import { Action, createReducer, on } from '@ngrx/store';
import {
    getUserGroupTree,
    getUserGroupTreeError,
    getUserGroupTreeSuccess
} from './groups.actions';
import { GroupsState } from './groups.model';

const initialState: GroupsState = {
    userGroupTree: null,
    loading: false,
    error: null
};

const reducer = createReducer(
    initialState,
    on(getUserGroupTree, (state) => ({
        ...state,
        userGroupTree: null,
        loading: true,
        error: null
    })),
    on(getUserGroupTreeSuccess, (state, { tree }) => ({
        ...state,
        userGroupTree: tree,
        loading: false,
        error: null
    })),
    on(getUserGroupTreeError, (state, { error }) => ({
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
