import { Action, createReducer, on } from '@ngrx/store';
import { Interval } from 'date-fns';
import {
    actionDataSourceRemoveInterval,
    actionDataSourceSetInfo,
    actionDataSourceSetInterval
} from './data-source.actions';

export interface DataSourceState {
    intervals: Array<Interval>;
    info?: {
        minDatetime: Date;
        maxDatetime: Date;
    };
}

export const initialState: DataSourceState = {
    intervals: [],
    info: undefined
};

const reducer = createReducer(
    initialState,
    on(actionDataSourceSetInterval, (state, action) => {
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
    on(actionDataSourceRemoveInterval, (state) => {
        console.log('actionRemoveInterval');
        if (state.intervals.length < 2) {
            return state;
        }
        return {
            ...state,
            intervals: state.intervals.slice(0, state.intervals.length - 1)
        };
    }),
    on(actionDataSourceSetInfo, (state, action) => {
        return {
            ...state,
            info: {
                minDatetime: action.minDatetime,
                maxDatetime: action.maxDatetime
            }
        };
    })
);

export function dataSourceReducer(
    state: DataSourceState | undefined,
    action: Action
): DataSourceState {
    return reducer(state, action);
}
