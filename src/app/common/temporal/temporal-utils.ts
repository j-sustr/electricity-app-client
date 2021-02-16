import add from 'date-fns/add';
import isEqual from 'date-fns/isEqual';
import * as d3 from 'd3-time';

export function startAndDurationToInterval(
    start: Date,
    duration: Duration
): Interval {
    return {
        start,
        end: add(start, duration)
    };
}

export function isYear(date: Date): boolean {
    return isEqual(d3.timeYear.floor(date), date);
}
export function isMonth(date: Date): boolean {
    return isEqual(d3.timeMonth.floor(date), date);
}
export function isWeek(date: Date): boolean {
    return isEqual(d3.timeWeek.floor(date), date);
}
export function isDay(date: Date): boolean {
    return isEqual(d3.timeDay.floor(date), date);
}
export function isHour(date: Date): boolean {
    return isEqual(d3.timeHour.floor(date), date);
}
