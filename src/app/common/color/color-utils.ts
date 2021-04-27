import * as d3 from 'd3-color';

export function shiftColorHue(color: string, amount: number): string {
    const c = d3.hsl(color);
    c.h += amount;
    return c.formatHex();
}
