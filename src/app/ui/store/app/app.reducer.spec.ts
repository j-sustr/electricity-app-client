import { Action } from '@ngrx/store';
import { actionRemoveInterval, actionSetInterval } from './app.actions';
import { appReducer, AppState, initialState } from './app.reducer';

describe('AppReducer', () => {
    const TEST_INITIAL_STATE: AppState = {
        intervals: [
            {
                start: -Infinity,
                end: Infinity
            }
        ]
    };

    const TEST_INITIAL_STATE_2: AppState = {
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
        const state = appReducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it('should set an interval', () => {
        const action = actionSetInterval({
            index: 0,
            start: new Date(0),
            end: new Date(1000)
        });

        const state = appReducer(TEST_INITIAL_STATE, action);
        expect(state.intervals).toEqual([
            {
                start: action.start,
                end: action.end
            }
        ]);
    });

    it('should remove an interval', () => {
        const action = actionRemoveInterval();

        const state = appReducer(TEST_INITIAL_STATE_2, action);

        expect(state.intervals).toEqual([
            {
                start: -Infinity,
                end: Infinity
            }
        ]);
    });
});
