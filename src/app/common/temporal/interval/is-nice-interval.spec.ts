import { isNiceInterval } from './is-nice-interval';

describe('isNiceInterval()', () => {
    it('should throw error', () => {
        const interval: Interval = {
            start: new Date(2022, 0, 1),
            end: new Date(2021, 0, 1)
        };

        expect(() => {
            isNiceInterval(interval);
        }).toThrowError('start is after end');
    });

    it('should be nice year', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2022, 0, 1)
        };

        const result = isNiceInterval(interval);

        expect(result).toBe(true);
    });

    it('should be nice month', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2021, 1, 1)
        };

        const result = isNiceInterval(interval);

        expect(result).toBe(true);
    });

    it('should be nice day', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2021, 0, 2)
        };

        const result = isNiceInterval(interval);

        expect(result).toBe(true);
    });

    it('should be nice hour', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1, 1),
            end: new Date(2021, 0, 1, 2)
        };

        const result = isNiceInterval(interval);

        expect(result).toBe(true);
    });

    it('should not be nice (1)', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2022, 0, 2)
        };

        const result = isNiceInterval(interval);

        expect(result).toBe(false);
    });

    it('should not be nice (2)', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2023, 0, 1)
        };

        const result = isNiceInterval(interval);

        expect(result).toBe(false);
    });

    it('should not be nice (3)', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1, 3, 3, 3, 3),
            end: new Date(2023, 0, 1, 3, 3, 3, 3)
        };

        const result = isNiceInterval(interval);

        expect(result).toBe(false);
    });
});
