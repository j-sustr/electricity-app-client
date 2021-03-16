import { Action, createReducer, on } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import {
    getInfo,
    getInfoError,
    getInfoSuccess,
    setIntervals,
    setPhases
} from './data-source.actions';
import { DataSourceState } from './data-source.model';

export const initialState: DataSourceState = {
    datasourceName: null,
    interval1: {
        start: -Infinity,
        end: Infinity
    },
    phases: {
        main: true,
        l1: false,
        l2: false,
        l3: false
    },
    loading: false
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
    on(setPhases, (state, action) => {
        return {
            ...state,
            phases: {
                main: action.main,
                l1: action.l1,
                l2: action.l2,
                l3: action.l3
            }
        };
    }),
    on(getInfo, (state) => {
        return {
            ...state,
            info: undefined,
            loading: true,
            error: undefined
        };
    }),
    on(getInfoSuccess, (state, action) => {
        return {
            ...state,
            info: {
                minDatetime: action.minDatetime,
                maxDatetime: action.maxDatetime
            },
            loading: false
        };
    }),
    on(getInfoError, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    })
);

export function dataSourceReducer(
    state: DataSourceState | undefined,
    action: Action
): DataSourceState {
    return reducer(state, action);
}
