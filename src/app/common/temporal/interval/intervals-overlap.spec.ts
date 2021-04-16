import { getIntervalsOverlap } from './intervals-overlap';

describe('getIntervalsOverlap()', () => {
    const interval1: Interval = {
        start: new Date(2021, 3, 16),
        end: new Date(2021, 3, 18)
    };

    it(`should return null when 2 intervals don't overlap`, () => {
        const interval2: Interval = {
            start: new Date(2021, 4, 16),
            end: new Date(2021, 4, 18)
        };

        const result = getIntervalsOverlap([interval1, interval2]);

        expect(result).toBeNull();
    });

    it(`should return overlap of 3 intervals`, () => {
        const interval2: Interval = {
            start: new Date(2021, 3, 16, 10),
            end: new Date(2021, 3, 17, 12)
        };
        const interval3: Interval = {
            start: new Date(2021, 3, 16, 11),
            end: new Date(2021, 3, 17, 20)
        };

        const result = getIntervalsOverlap([interval1, interval2, interval3]);

        expect(result).toEqual({
            start: new Date(2021, 3, 16, 11),
            end: new Date(2021, 3, 17, 12)
        });
    });
});
