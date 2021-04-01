export function calcCosFi(ep: number, eq: number): number {
    return ep / Math.hypot(ep, eq);
}

export function calcTanFi(ep: number, eq: number): number {
    return eq / ep;
}

export function calcTanFiOverrunPercent(tanFi: number): number {
    const threshold = 0.328;
    return (100 * Math.abs(tanFi - threshold)) / threshold;
}
