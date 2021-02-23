import { Interval, intervalToDuration } from 'date-fns';
import { isEqual } from 'lodash';

export function intervalsHaveEqualDuration(
    interval1: Interval,
    interval2: Interval
): boolean {
    const d1 = intervalToDuration(interval1);
    const d2 = intervalToDuration(interval2);

    return isEqual(d1, d2);
}
