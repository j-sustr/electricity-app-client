import add from 'date-fns/add';

export function startAndDurationToInterval(
    start: Date,
    duration: Duration
): Interval {
    return {
        start,
        end: add(start, duration)
    };
}
