import * as d3 from 'd3-time';
import { differenceInMonths, differenceInYears, toDate } from 'date-fns';
import isEqual from 'date-fns/isEqual';

export function formatInterval(value: Interval): string {
    throw Error('not implemented');
    if (isNiceInterval(value)) {
    }
}

function isNiceInterval(value: Interval) {
    const start = toDate(value.start);
    const end = toDate(value.end);

    if (isYear(start) && isYear(end)) {
        if (differenceInYears(start, end)) {
            return true;
        }
    }
    if (isMonth(start) && isMonth(end)) {
        if (differenceInMonths(start, end)) {
            return true;
        }
    }

    return false;
}

function isYear(date: Date): boolean {
    return isEqual(d3.timeYear.floor(date), date);
}
function isMonth(date: Date): boolean {
    return isEqual(d3.timeMonth.floor(date), date);
}
function isWeek(date: Date): boolean {
    return isEqual(d3.timeWeek.floor(date), date);
}
function isDay(date: Date): boolean {
    return isEqual(d3.timeDay.floor(date), date);
}
function isHour(date: Date): boolean {
    return isEqual(d3.timeHour.floor(date), date);
}
