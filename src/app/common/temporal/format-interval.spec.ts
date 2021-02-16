import { formatInterval } from './format-interval';

describe('formatInterval()', () => {
    it('should format nice year', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2022, 0, 1)
        };

        const result = formatInterval(interval);

        expect(result).toBe('2021');
    });

    it('should format nice month', () => {
        const interval: Interval = {
            start: new Date(2021, 0, 1),
            end: new Date(2021, 1, 1)
        };

        const result = formatInterval(interval);

        expect(result).toBe('January 2021');
    });
});
