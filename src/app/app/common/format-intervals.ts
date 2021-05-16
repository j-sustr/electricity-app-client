import { formatInterval } from 'src/app/common/temporal/interval/format-interval';

export function formatIntervalVsInterval({
    interval1,
    interval2
}: {
    interval1: Interval | null;
    interval2: Interval | null;
}): string {
    if (!interval1) {
        return 'no interval';
    }
    if (!interval2) {
        return formatInterval(interval1);
    }

    return formatInterval(interval1) + ' vs. ' + formatInterval(interval2);
}
