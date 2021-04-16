import { Action } from '@ngrx/store';
import { setIntervals } from './data-source.actions';
import { DataSourceState } from './data-source.model';
import { dataSourceReducer, initialState } from './data-source.reducer';

describe('DataSource Reducer', () => {
    const TEST_INITIAL_STATE: DataSourceState = {
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

    const TEST_INITIAL_STATE_2: DataSourceState = {
        datasourceName: null,
        interval1: {
            start: -Infinity,
            end: Infinity
        },
        interval2: {
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

    it('should return the default state', () => {
        const action = {} as Action;
        const state = dataSourceReducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it('should set an interval1', () => {
        const action = setIntervals({
            interval1: {
                start: new Date(0),
                end: new Date(1000)
            }
        });

        const state = dataSourceReducer(TEST_INITIAL_STATE, action);
        expect(state.interval1).toEqual({
            start: action.interval1.start,
            end: action.interval1.end
        });
    });

    it('should remove an interval', () => {
        const action = setIntervals({
            interval1: {
                start: -Infinity,
                end: Infinity
            },
            interval2: undefined
        });

        const state = dataSourceReducer(TEST_INITIAL_STATE_2, action);

        expect(state).toEqual({
            datasourceName: null,
            interval1: {
                start: -Infinity,
                end: Infinity
            },
            interval2: undefined,
            phases: {
                main: true,
                l1: false,
                l2: false,
                l3: false
            },
            loading: false
        });
    });
});
