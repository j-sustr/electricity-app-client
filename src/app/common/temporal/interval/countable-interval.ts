import intervalToDuration from 'date-fns/intervalToDuration';
import * as d3 from 'd3-time';

export type CountableIntervalType = 'years' | 'months' | 'days' | 'hours';

export function getCountableIntervalType(
    interval: Interval
): CountableIntervalType {
    const dur = intervalToDuration(interval);

    if (dur.years && dur.years > 0) {
        return 'years';
    }
    if (dur.months && dur.months > 0) {
        return 'months';
    }
    if (dur.days && dur.days > 0) {
        return 'days';
    }
    if (dur.hours && dur.hours > 0) {
        return 'hours';
    }

    throw Error('not implemented');
}

export function getCountableInterval(
    interval: CountableIntervalType
): d3.CountableTimeInterval {
    switch (interval) {
        case 'years':
            return d3.timeYear;
        case 'months':
            return d3.timeMonth;
        case 'days':
            return d3.timeDay;
        case 'hours':
            return d3.timeHour;
    }
    throw new Error('invalid interval type');
}
