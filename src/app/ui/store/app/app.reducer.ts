import { Action, createReducer, on } from '@ngrx/store';
import { Interval } from 'date-fns';
import { actionRemoveInterval, actionSetInterval } from './app.actions';

export interface AppState {
    intervals: Array<Interval>;
}

export const initialState: AppState = {
    intervals: []
};

const reducer = createReducer(
    initialState,
    on(actionSetInterval, (state, action) => {
        const intervals = [...state.intervals];
        intervals[action.index] = {
            start: action.start,
            end: action.end
        };
        return {
            ...state,
            intervals
        };
    }),
    on(actionRemoveInterval, (state) => {
        if (state.intervals.length < 2) {
            return state;
        }
        return {
            ...state,
            intervals: state.intervals.slice(0, state.intervals.length - 1)
        };
    })
);

export function appReducer(
    state: AppState | undefined,
    action: Action
): AppState {
    return reducer(state, action);
}
