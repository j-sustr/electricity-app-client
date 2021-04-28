export function calcTanFiFromCosFi(cosFi: number): number {
    return Math.tan(Math.acos(cosFi));
}

export function calcTanFiOverrunPercent(tanFi: number): number {
    const threshold = 0.328;
    return (100 * Math.abs(tanFi - threshold)) / threshold;
}
