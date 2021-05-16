import { toUnitPrefix } from 'src/app/common/number/number-utils';
import { getMonthName } from 'src/app/common/temporal/temporal-utils';
import { ICostlyQuantitiesDetailItem } from 'src/app/web-api-client';
import { calcTanFiFromCosFi, calcTanFiOverrunPercent } from './costs-utils';
import ERUCalculator from './ERUCalculator';

export interface CostsDetailItem {
    year: number;
    month: string;
    interval: Interval;
    itemName: string;
    quantity: string;
    unit?: string;
    currency?: string;
    costPerUnit?: number;
    cost?: number;
}

export function calculateCostsDetailItems(
    source: ICostlyQuantitiesDetailItem[],
    interval: Interval,
    calc: ERUCalculator | null
): CostsDetailItem[] {
    const items: CostsDetailItem[] = [];

    for (let i = 0; i < source.length; i++) {
        const monthInterval: Interval = {
            start: interval.start,
            end: interval.end
        };
        if (i === 0) {
            monthInterval.start = interval.start;
        }
        if (i === source.length - 1) {
            monthInterval.end = interval.end;
        }

        const item = calculateCostsItemsForMonth(
            source[i],
            monthInterval,
            calc
        );
        items.push(...item);
    }

    return items;
}

export function calculateCostsItemsForMonth(
    src: ICostlyQuantitiesDetailItem,
    interval: Interval,
    calc: ERUCalculator | null
): CostsDetailItem[] {
    const ep = src?.activeEnergy ?? NaN;
    const eq = src?.reactiveEnergy ?? NaN;
    const epMega = toUnitPrefix(ep, 'Mega');
    const eqMega = toUnitPrefix(eq, 'Mega');

    const pmaxKilo = toUnitPrefix(src?.peakDemand ?? NaN, 'Kilo');
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
        month: getMonthName((src.month ?? NaN) - 1),
        interval
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
        quantity: pmaxMega.toFixed(3),
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
            cost: calc?.reservedPowerOverrunCost(rcoMega)
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
            quantity: toUnitPrefix(calc.yearlyReservedCapacity, 'Kilo').toFixed(
                3
            ),
            unit: `${unitPrefix}W`,
            currency,
            costPerUnit: calc.yearlyReservedCapacityCostPerUnit(),
            cost: calc.yearlyReservedCapacityCost()
        });

        ds.push({
            ...yearMonth,
            itemName: 'Monthly reserved capacity cost',
            quantity: toUnitPrefix(
                calc.monthlyReservedCapacity,
                'Kilo'
            ).toFixed(3),
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
