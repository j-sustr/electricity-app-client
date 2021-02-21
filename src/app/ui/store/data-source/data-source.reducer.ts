import { Action, createReducer, on } from '@ngrx/store';
import { Interval } from 'date-fns';
import { actionRemoveInterval, actionSetInterval } from './data-source.actions';

export interface DataSourceState {
    intervals: Array<Interval>;
}

export const initialState: DataSourceState = {
    intervals: []
};

const reducer = createReducer(
    initialState,
    on(actionSetInterval, (state, action) => {
        console.log('actionSetInterval', action);
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
        console.log('actionRemoveInterval');
        if (state.intervals.length < 2) {
            return state;
        }
        return {
            ...state,
            intervals: state.intervals.slice(0, state.intervals.length - 1)
        };
    })
);

export function dataSourceReducer(
    state: DataSourceState | undefined,
    action: Action
): DataSourceState {
    return reducer(state, action);
}
