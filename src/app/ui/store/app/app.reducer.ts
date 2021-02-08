import { Action, createReducer, on } from '@ngrx/store';
import { areIntervalsOverlapping, Interval } from 'date-fns';
import { actionSetInterval } from './app.actions';

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
    })
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}
