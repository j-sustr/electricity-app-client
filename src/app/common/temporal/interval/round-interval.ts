import { toDate } from 'date-fns';
import {
    CountableIntervalType,
    getCountableInterval,
    getCountableIntervalType
} from './countable-interval';

export type RoundType = 'ceil' | 'floor' | 'round';

export function roundInterval(
    interval: Interval,
    startRound: RoundType = 'round',
    endRound: RoundType = 'round'
): Interval {
    const ciType = getCountableIntervalType(interval);
    const start = toDate(interval.start);
    const end = toDate(interval.end);

    return {
        start: getRoundFn(ciType, startRound)(start),
        end: getRoundFn(ciType, endRound)(end)
    };
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
