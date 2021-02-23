export function areIntervalsEqual(
    interval1: Interval,
    interval2: Interval
): boolean {
    if (interval1.start !== interval2.start) {
        return false;
    }
    if (interval1.end !== interval2.end) {
        return false;
    }
    return true;
}
