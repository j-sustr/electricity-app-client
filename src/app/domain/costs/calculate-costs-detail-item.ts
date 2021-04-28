import { toKilo, toMega } from 'src/app/common/number/number-utils';
import { getMonthName } from 'src/app/common/temporal/temporal-utils';
import { ICostlyQuantitiesDetailItem } from 'src/app/web-api-client';
import { calcTanFiFromCosFi, calcTanFiOverrunPercent } from './costs-utils';
import ERUCalculator from './ERUCalculator';

export interface CostsDetailItem {
    year: number;
    month: string;
    itemName: string;
    quantity: string;
    unit?: string;
    currency?: string;
    costPerUnit?: number;
    cost?: number;
}

export function calculateCostsDetailItems(
    source: ICostlyQuantitiesDetailItem[],
    calc: ERUCalculator | null
): CostsDetailItem[] {
    const items: CostsDetailItem[] = [];

    for (const srcItem of source) {
        const item = calculateCostsItemsForMonth(srcItem, calc);
        items.push(...item);
    }

    return items;
}

export function calculateCostsItemsForMonth(
    src: ICostlyQuantitiesDetailItem,
    calc: ERUCalculator | null
): CostsDetailItem[] {
    const ep = src?.activeEnergy ?? NaN;
    const eq = src?.reactiveEnergy ?? NaN;
    const epMega = toMega(ep);
    const eqMega = toMega(eq);

    const pmaxKilo = toKilo(src?.peakDemand ?? NaN);
    const pmaxMega = pmaxKilo / 1000;

    const rpoKilo = calc?.reservedPowerOverrun(pmaxKilo);
    const rpoMega = (rpoKilo ?? NaN) / 1000;

    const rcoKilo = calc?.reservedCapacityOverrun(pmaxKilo);
    const rcoMega = (rcoKilo ?? NaN) / 1000;

    const cosFi = src.cosFi ?? NaN;
    const tgFi = calcTanFiFromCosFi(cosFi);
    const tgFiOverrunPerc = calcTanFiOverrunPercent(tgFi);
    const u = calc?.powerFactorSurcharge(cosFi) ?? NaN;
    const pfPenalty = calc?.powerFactorPenalty(pmaxMega, u, epMega);

    const yearMonth = {
        year: src.year ?? NaN,
        month: getMonthName((src.month ?? NaN) - 1)
    };
    const unitPrefix = 'M';
    const currency = 'CZK';

    const ds: CostsDetailItem[] = [];
    ds.push({
        ...yearMonth,
        itemName: 'Active Energy',
        quantity: epMega.toFixed(3),
        unit: `${unitPrefix}Wh`
    });

    ds.push({
        ...yearMonth,
        itemName: 'cos FI',
        quantity: cosFi.toFixed(5),
        unit: '-'
    });

    ds.push({
        ...yearMonth,
        itemName: 'Maximum Demand',
        quantity: toMega(src?.peakDemand ?? NaN).toFixed(3),
        unit: `${unitPrefix}W`
    });

    ds.push({
        ...yearMonth,
        itemName: 'Reactive Energy',
        quantity: eqMega.toFixed(3),
        unit: `${unitPrefix}VArh`,
        currency,
        costPerUnit: calc?.reactiveEnergySupplyCostPerUnit(),
        cost: calc?.reactiveEnergySupplyCost(eqMega)
    });

    if (calc && calc.voltageLevel !== 'NN') {
        ds.push({
            ...yearMonth,
            itemName: 'Reserved power exceed cost',
            quantity: rpoMega?.toFixed(3),
            unit: `${unitPrefix}W`,
            currency,
            costPerUnit: calc?.reservedPowerOverrunCostPerUnit(),
            cost: calc?.reservedCapacityOverrunCost(rcoMega)
        });

        ds.push({
            ...yearMonth,
            itemName: 'Reserved capacity exceed cost',
            quantity: rcoMega.toFixed(3),
            unit: `${unitPrefix}W`,
            currency,
            costPerUnit: calc.reservedCapacityOverrunCostPerUnit(),
            cost: calc.reservedCapacityOverrunCost(pmaxKilo)
        });

        ds.push({
            ...yearMonth,
            itemName: 'Yearly reserved capacity cost',
            quantity: toMega(calc.yearlyReservedCapacity).toFixed(3),
            unit: `${unitPrefix}W`,
            currency,
            costPerUnit: calc.yearlyReservedCapacityCostPerUnit(),
            cost: calc.yearlyReservedCapacityCost()
        });

        ds.push({
            ...yearMonth,
            itemName: 'Monthly reserved capacity cost',
            quantity: toMega(calc.monthlyReservedCapacity).toFixed(3),
            unit: `${unitPrefix}W`,
            currency,
            costPerUnit: calc.monthlyReservedCapacityCostPerUnit(),
            cost: calc.monthlyReservedCapacityCost()
        });
    }

    ds.push({
        ...yearMonth,
        itemName: 'Power Factor Penalty - tg FI>0.328',
        quantity: tgFiOverrunPerc.toFixed(0),
        unit: '%',
        currency,
        cost: pfPenalty
    });

    return ds;
}
