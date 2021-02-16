import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInYears from 'date-fns/differenceInYears';
import toDate from 'date-fns/toDate';
import { compareAsc, differenceInDays, differenceInHours } from 'date-fns';
import { isYear, isMonth, isDay, isHour } from './temporal-utils';

export function isNiceInterval(value: Interval): boolean {
    const start = toDate(value.start);
    const end = toDate(value.end);

    if (compareAsc(start, end) === 1) {
        throw new Error('start is after end');
    }

    if (isYear(start) && isYear(end)) {
        if (differenceInYears(end, start) === 1) {
            return true;
        }
    }
    if (isMonth(start) && isMonth(end)) {
        if (differenceInMonths(end, start) === 1) {
            return true;
        }
    }
    if (isDay(start) && isDay(end)) {
        if (differenceInDays(end, start) === 1) {
            return true;
        }
    }
    if (isHour(start) && isHour(end)) {
        if (differenceInHours(end, start) === 1) {
            return true;
        }
    }

    return false;
}
