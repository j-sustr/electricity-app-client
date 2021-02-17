import { getNextInterval, getPreviousInterval } from './adjacent-interval';

describe('getNextInterval()', () => {
    it('should return next year', () => {
        const a: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2022, 0, 1)
        };

        const b = getNextInterval(a);

        expect(b).toEqual({
            start: new Date(2022, 0, 1),
            end: new Date(2023, 0, 1)
        });
    });

    it('should return next month', () => {
        const a: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2021, 1, 1)
        };

        const b = getNextInterval(a);

        expect(b).toEqual({
            start: new Date(2021, 1, 1),
            end: new Date(2021, 2, 1)
        });
    });

    it('should return next day', () => {
        const a: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2021, 0, 2)
        };

        const b = getNextInterval(a);

        expect(b).toEqual({
            start: new Date(2021, 0, 2),
            end: new Date(2021, 0, 3)
        });
    });

    it('should return previous day', () => {
        const a: Interval = {
            start: new Date(2021, 0, 4),
            end: new Date(2021, 0, 5)
        };

        const b = getPreviousInterval(a);

        expect(b).toEqual({
            start: new Date(2021, 0, 3),
            end: new Date(2021, 0, 4)
        });
    });
});
