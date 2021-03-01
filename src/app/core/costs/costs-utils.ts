export function calcCosFi(ep: number, eq: number): number {
    return ep / Math.hypot(ep, eq);
}
