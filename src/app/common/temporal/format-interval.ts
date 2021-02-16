import {
    compareAsc,
    format,
    getHours,
    intervalToDuration,
    isValid,
    toDate
} from 'date-fns';
import { isNiceInterval } from './is-nice-interval';
import { isDay, isHour, isMonth, isYear } from './temporal-utils';

export function formatInterval(interval: Interval): string {
    if (compareAsc(interval.start, interval.end) === 1) {
        throw new Error('start is after end');
    }
    if (interval.start === interval.end) {
        throw new Error('interval has 0 duration');
    }
    if (isUnboundedInterval(interval)) {
        return formatUnboundedInterval(interval);
    }

    if (isNiceInterval(interval)) {
        return formatNiceInterval(interval);
    }

    throw new Error('not implemented');
}

function isUnboundedInterval(interval: Interval): boolean {
    if (interval.start === -Infinity) {
        return true;
    }
    if (interval.end === Infinity) {
        return true;
    }
    return false;
}

function formatUnboundedInterval(interval: Interval): string {
    if (interval.start === -Infinity && interval.end === Infinity) {
        return 'everything';
    }

    throw Error('not implemented');
}

function formatNiceInterval(interval: Interval) {
    const start = toDate(interval.start);
    const d = intervalToDuration(interval);
    if (isYear(start) && d.years === 1) {
        return format(start, 'yyyy');
    } else if (isMonth(start) && d.months === 1) {
        return format(start, 'MMMM, yyyy');
    } else if (isDay(start) && d.days === 1) {
        return format(start, 'MMMM d, yyyy');
    } else if (isHour(start) && d.hours === 1) {
        const h = getHours(interval.start);
        const time = `${h}:00 - ${h + 1}:00`;
        const date = format(start, 'MMMM d, yyyy');
        return `${time}, ${date}`;
    }

    throw Error('not implemented');
}
