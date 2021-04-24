import { BinRange, PowerFactorDistributionItem } from 'src/app/web-api-client';

export interface PowerFactorDistributionCalculatedItem {
    range: BinRange;
    valueMain?: number;
    valueL1?: number;
    valueL2?: number;
    valueL3?: number;
}

export function calculatePowerFactorDistribution(
    items: PowerFactorDistributionItem[]
): PowerFactorDistributionCalculatedItem[] {
    let valuesMainSum = 0;
    let valuesL1Sum = 0;
    let valuesL2Sum = 0;
    let valuesL3Sum = 0;
    for (const item of items) {
        valuesMainSum += item.valueMain ?? 0;
        valuesL1Sum += item.valueL1 ?? 0;
        valuesL2Sum += item.valueL2 ?? 0;
        valuesL3Sum += item.valueL3 ?? 0;
    }

    return items.map((item) => ({
        range:
            item.range ??
            ({
                start: NaN,
                end: NaN
            } as BinRange),
        valueMain:
            typeof item.valueMain === 'number'
                ? (100 * item.valueMain) / valuesMainSum
                : undefined,
        valueL1:
            typeof item.valueL1 === 'number'
                ? (100 * item.valueL1) / valuesL1Sum
                : undefined,
        valueL2:
            typeof item.valueL2 === 'number'
                ? (100 * item.valueL2) / valuesL2Sum
                : undefined,
        valueL3:
            typeof item.valueL3 === 'number'
                ? (100 * item.valueL3) / valuesL3Sum
                : undefined
    }));
}
