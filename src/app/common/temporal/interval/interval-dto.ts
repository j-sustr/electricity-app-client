import toDate from 'date-fns/toDate';
import { IntervalDto } from 'src/app/web-api-client';
import { assertValidInterval } from './assert-valid-interval';

// export interface IntervalDto {
//     start?: Date;
//     end?: Date;
//     isInfinite?: boolean;
// }

export function intervalToDto(interval: Interval): IntervalDto {
    assertValidInterval(interval);
    if (interval.start === -Infinity || interval.end === Infinity) {
        if (interval.start !== -Infinity || interval.end !== Infinity) {
            throw Error('not implemented (intervalToDto)');
        }
        return new IntervalDto({
            isInfinite: true
        });
    }
    return new IntervalDto({
        start: toDate(interval.start),
        end: toDate(interval.end)
    });
}

export function intervalFromDto(dto: IntervalDto | null | undefined): Interval {
    if (!dto) {
        throw new TypeError('invalid dto');
    }
    const interval: Interval = {
        start: dto.start ?? new Date(NaN),
        end: dto.end ?? new Date(NaN)
    };
    assertValidInterval(interval);
    return interval;
}
