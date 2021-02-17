import {
    addDays,
    addMonths,
    addYears,
    intervalToDuration,
    subDays,
    subMonths,
    subYears,
    toDate
} from 'date-fns';
import { isDay, isHour, isMonth, isYear } from '../temporal-utils';
import { isNiceInterval } from './is-nice-interval';

export function getNextInterval(interval: Interval): Interval {
    return getAdjacentInterval(interval, true);
}

export function getPreviousInterval(interval: Interval): Interval {
    return getAdjacentInterval(interval, false);
}

function getAdjacentInterval(interval: Interval, next = true): Interval {
    const start = toDate(interval.start);
    const end = toDate(interval.end);
    const dur = intervalToDuration(interval);
    if (isNiceInterval(interval)) {
        if (isYear(start) && dur.years === 1) {
            return {
                start: next ? addYears(start, 1) : subYears(start, 1),
                end: next ? addYears(end, 1) : subYears(end, 1)
            };
        }
        if (isMonth(start) && dur.months === 1) {
            return {
                start: next ? addMonths(start, 1) : subMonths(start, 1),
                end: next ? addMonths(end, 1) : subMonths(end, 1)
            };
        }
        if (isDay(start) && dur.days === 1) {
            return {
                start: next ? addDays(start, 1) : subDays(start, 1),
                end: next ? addDays(end, 1) : subDays(end, 1)
            };
        }
        if (isHour(start) && dur.hours === 1) {
            return {
                start: next ? addDays(start, 1) : subDays(start, 1),
                end: next ? addDays(end, 1) : subDays(end, 1)
            };
        }
    }

    throw Error('not implemented');
}
