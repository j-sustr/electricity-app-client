import { Action } from '@ngrx/store';
import { actionSetInterval } from './app.actions';
import { appReducer, AppState, initialState } from './app.reducer';

describe('AppReducer', () => {
    const TEST_INTITIAL_STATE: AppState = {
        intervals: []
    };

    it('should return the default state', () => {
        const action = {} as Action;
        const state = appReducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it('should set the interval', () => {
        const action = actionSetInterval({
            index: 0,
            start: new Date(0),
            end: new Date(1000)
        });

        const state = appReducer(TEST_INTITIAL_STATE, action);
        expect(state.intervals).toEqual([
            {
                start: action.start,
                end: action.end
            }
        ]);
    });
});
