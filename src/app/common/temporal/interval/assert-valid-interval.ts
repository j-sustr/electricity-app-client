export function assertValidInterval(interval: Interval, name = ''): void {
    const start = interval.start;
    const end = interval.end;
    let valid = true;
    if (Number.isNaN(start) || Number.isNaN(end)) {
        valid = false;
    }
    if (start === Infinity || end === -Infinity) {
        valid = false;
    }
    if (end <= start) {
        valid = false;
    }
    if (!valid) {
        throw new Error(`Interval ${name} is invalid`);
    }
}
