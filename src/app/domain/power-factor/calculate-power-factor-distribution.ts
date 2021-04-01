import { PowerFactorDistributionItem } from 'src/app/web-api-client';

export interface PowerFactorDistributionCalculatedItem {
    range: string | null;
    valueMain: number | null;
    valueL1: number | null;
    valueL2: number | null;
    valueL3: number | null;
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
        range: item.range ?? '(no range)',
        valueMain:
            typeof item.valueMain === 'number'
                ? (100 * item.valueMain) / valuesMainSum
                : null,
        valueL1:
            typeof item.valueL1 === 'number'
                ? (100 * item.valueL1) / valuesL1Sum
                : null,
        valueL2:
            typeof item.valueL2 === 'number'
                ? (100 * item.valueL2) / valuesL2Sum
                : null,
        valueL3:
            typeof item.valueL3 === 'number'
                ? (100 * item.valueL3) / valuesL3Sum
                : null
    }));
}
