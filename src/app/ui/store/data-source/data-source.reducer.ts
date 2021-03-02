import { Action, createReducer, on } from '@ngrx/store';
import { Interval } from 'date-fns';
import { isEqual } from 'lodash';
import { actionDataSourceSetInfo, setIntervals } from './data-source.actions';

export interface DataSourceState {
    interval1: Interval;
    interval2?: Interval;
    info?: {
        minDatetime: Date;
        maxDatetime: Date;
    };
}

export const initialState: DataSourceState = {
    interval1: {
        start: -Infinity,
        end: Infinity
    }
};

const reducer = createReducer(
    initialState,
    on(setIntervals, (state, action) => {
        const interval1 = isEqual(state.interval1, action.interval1)
            ? state.interval1
            : action.interval1;
        const interval2 = isEqual(state.interval2, action.interval2)
            ? state.interval2
            : action.interval2;
        return {
            ...state,
            interval1,
            interval2
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
