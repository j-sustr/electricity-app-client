import {
    addDays,
    addHours,
    addMonths,
    addYears,
    intervalToDuration,
    subDays,
    subHours,
    subMonths,
    subYears
} from 'date-fns';
import {
    CountableIntervalType,
    getCountableIntervalType
} from './countable-interval';
import { roundInterval } from './round-interval';

export function getNextInterval(interval: Interval): Interval {
    return getAdjacentInterval(interval, true);
}

export function getPreviousInterval(interval: Interval): Interval {
    return getAdjacentInterval(interval, false);
}

function getAdjacentInterval(interval: Interval, next = true): Interval {
    interval = roundInterval(interval, 'ceil', 'floor');
    const ciType = getCountableIntervalType(interval);
    const dur = intervalToDuration(interval);
    const addFn = getAddFunc(ciType, next);
    const addAmount = dur[ciType];
    if (!addAmount) {
        return {
            ...interval
        };
    }
    return {
        start: addFn(interval.start, addAmount),
        end: addFn(interval.end, addAmount)
    };
}

function getAddFunc(
    ci: CountableIntervalType,
    add = true
): (d: Date | number, a: number) => Date {
    switch (ci) {
        case 'years':
            return add ? addYears : subYears;
        case 'months':
            return add ? addMonths : subMonths;
        case 'days':
            return add ? addDays : subDays;
        case 'hours':
            return add ? addHours : subHours;
    }

    throw Error('not implemented (getAddFunc)');
}
