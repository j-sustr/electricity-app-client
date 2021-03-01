export function sum(values: number[]): number {
    return values.reduce((acc, val) => acc + val, 0);
}

export function avg(values: number[]): number {
    return sum(values) / values.length;
}

export const zip = <T>(...arrays: T[][]): T[][] => {
    const maxLength = Math.max(...arrays.map((x) => x.length));
    return Array.from({ length: maxLength }).map((_, i) => {
        return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
    });
};
