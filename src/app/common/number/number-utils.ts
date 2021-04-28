export function compareDecimalPlaces(
    a: number,
    b: number,
    ndp: number
): number {
    const k = 10 ** ndp;
    return Math.trunc(k * a) - Math.trunc(k * b);
}

export type UnitPrefix = 'Mega' | 'Kilo';

export function toUnitPrefix(v: number, u: UnitPrefix): number {
    switch (u) {
        case 'Mega':
            return v / 1000000;
        case 'Kilo':
            return v / 1000;
    }
    throw new Error('invalid unit');
}
