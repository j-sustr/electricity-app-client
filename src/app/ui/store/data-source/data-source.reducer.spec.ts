import { Action } from '@ngrx/store';
import {
    actionDataSourceRemoveInterval,
    actionDataSourceSetInterval
} from './data-source.actions';
import {
    dataSourceReducer,
    DataSourceState,
    initialState
} from './data-source.reducer';

describe('AppReducer', () => {
    const TEST_INITIAL_STATE: DataSourceState = {
        intervals: [
            {
                start: -Infinity,
                end: Infinity
            }
        ]
    };

    const TEST_INITIAL_STATE_2: DataSourceState = {
        intervals: [
            {
                start: -Infinity,
                end: Infinity
            },
            {
                start: -Infinity,
                end: Infinity
            }
        ]
    };

    it('should return the default state', () => {
        const action = {} as Action;
        const state = dataSourceReducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it('should set an interval', () => {
        const action = actionDataSourceSetInterval({
            index: 0,
            start: new Date(0),
            end: new Date(1000)
        });

        const state = dataSourceReducer(TEST_INITIAL_STATE, action);
        expect(state.intervals).toEqual([
            {
                start: action.start,
                end: action.end
            }
        ]);
    });

    it('should remove an interval', () => {
        const action = actionDataSourceRemoveInterval();

        const state = dataSourceReducer(TEST_INITIAL_STATE_2, action);

        expect(state.intervals).toEqual([
            {
                start: -Infinity,
                end: Infinity
            }
        ]);
    });
});
