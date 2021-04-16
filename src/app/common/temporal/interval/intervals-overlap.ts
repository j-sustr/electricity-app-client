import { min, max, compareDesc } from 'date-fns';

export function getIntervalsOverlap(intervals: Interval[]): Interval | null {
    const maxStart = max(intervals.map((i) => i.start));
    const minEnd = min(intervals.map((i) => i.end));
    if (compareDesc(maxStart, minEnd) !== 1) {
        return null;
    }
    return {
        start: maxStart,
        end: minEnd
    };
}
