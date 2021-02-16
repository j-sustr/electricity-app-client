import { addMonths, getMonth, getYear } from 'date-fns';
import intervalToDuration from 'date-fns/intervalToDuration';

export function roundInterval(interval: Interval): Interval {
    const d = intervalToDuration(interval);
    const yStart = getYear(interval.start);
    const yEnd = getYear(interval.end);
    if (d.years) {
        return {
            start: yStart,
            end: yEnd
        };
    }
    const mStart = getMonth(interval.start);
    const mEnd = getMonth(interval.end);
    if (d.months) {
        return {
            start: addMonths(new Date(yStart, 0, 0), mStart),
            end: addMonths(new Date(yEnd, 0, 0), mEnd)
        };
    }

    throw Error('not implemented');
}
