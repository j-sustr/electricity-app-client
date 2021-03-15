import toDate from 'date-fns/toDate';
import { assertValidInterval } from './assert-valid-interval';

export interface IntervalDto {
    start?: Date;
    end?: Date;
    isInfinite?: boolean;
}

export function intervalToDto(interval: Interval): IntervalDto {
    assertValidInterval(interval);
    if (interval.start === -Infinity || interval.end === Infinity) {
        if (interval.start !== -Infinity || interval.end !== Infinity) {
            throw Error('not implemented (intervalToDto)');
        }
        return { isInfinite: true };
    }
    return {
        start: toDate(interval.start),
        end: toDate(interval.end)
    };
}
