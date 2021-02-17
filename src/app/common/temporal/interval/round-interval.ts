import { addMonths, getMonth, getYear, toDate } from 'date-fns';
import intervalToDuration from 'date-fns/intervalToDuration';
import * as d3 from 'd3-time';

type CountableIntervalType = 'years' | 'months' | 'days' | 'hours';

export type RoundType = 'ceil' | 'floor' | 'round';

export function roundInterval(
    interval: Interval,
    startRound: RoundType = 'round',
    endRound: RoundType = 'round'
): Interval {
    const dur = intervalToDuration(interval);
    const start = toDate(interval.start);
    const end = toDate(interval.end);

    if (dur.years && dur.years > 0) {
        return {
            start: getRoundFn('years', startRound)(start),
            end: getRoundFn('years', endRound)(end)
        };
    }
    if (dur.months && dur.months > 0) {
        return {
            start: getRoundFn('months', startRound)(start),
            end: getRoundFn('months', endRound)(end)
        };
    }
    if (dur.days && dur.days > 0) {
        return {
            start: getRoundFn('days', startRound)(start),
            end: getRoundFn('days', endRound)(end)
        };
    }
    if (dur.hours && dur.hours > 0) {
        return {
            start: getRoundFn('hours', startRound)(start),
            end: getRoundFn('hours', endRound)(end)
        };
    }

    throw Error('not implemented');
}

function getRoundFn(
    interval: CountableIntervalType,
    round: RoundType
): (d: Date) => Date {
    const ci = getCountableInterval(interval);
    switch (round) {
        case 'ceil':
            return ci.ceil.bind(ci);
        case 'floor':
            return ci.floor.bind(ci);
        case 'round':
            return ci.round.bind(ci);
    }
    throw new Error('invalid round type');
}

function getCountableInterval(
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
