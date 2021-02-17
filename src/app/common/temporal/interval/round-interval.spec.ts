import { roundInterval } from './round-interval';

describe('roundInteval()', () => {
    it('should round interval to years', () => {
        const a: Interval = {
            start: new Date(2020, 2, 1),
            end: new Date(2030, 1)
        };

        const b = roundInterval(a);

        expect(b).toEqual({
            start: new Date(2020, 0, 1),
            end: new Date(2030, 0, 1)
        });
    });

    it('should round interval to months', () => {
        const a: Interval = {
            start: new Date(2020, 2, 1),
            end: new Date(2020, 5, 3)
        };

        const b = roundInterval(a);

        expect(b).toEqual({
            start: new Date(2020, 2, 1),
            end: new Date(2020, 5, 1)
        });
    });

    it('should round interval to days - floor, ceil', () => {
        const a: Interval = {
            start: new Date(2020, 1, 17, 22, 50),
            end: new Date(2020, 1, 22, 5, 10)
        };

        const b = roundInterval(a, 'floor', 'ceil');

        expect(b).toEqual({
            start: new Date(2020, 1, 17),
            end: new Date(2020, 1, 23)
        });
    });

    it('should round interval to hours - ceil, floor', () => {
        const a: Interval = {
            start: new Date(2020, 1, 17, 22, 50),
            end: new Date(2020, 1, 17, 5, 10)
        };

        const b = roundInterval(a, 'ceil', 'floor');

        expect(b).toEqual({
            start: new Date(2020, 1, 17, 23),
            end: new Date(2020, 1, 17, 5)
        });
    });
});
