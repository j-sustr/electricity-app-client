export function compareDecimalPlaces(
    a: number,
    b: number,
    ndp: number
): number {
    const k = 10 ** ndp;
    return Math.trunc(k * a) - Math.trunc(k * b);
}

export function toMega(v: number): number {
    return v / 1000000;
}

export function toKilo(v: number): number {
    return v / 1000;
}
