import { sum, zip } from 'src/app/common/array/array-utils';
import { toUnitPrefix } from 'src/app/common/number/number-utils';
import { CostlyQuantitiesOverviewItem } from 'src/app/web-api-client';
import ERUCalculator from './ERUCalculator';

export interface CostsOverviewItem {
    groupId: string;
    groupName: string;
    intervalStart: Date;
    intervalEnd: Date;
    activeEnergy: number;
    reactiveEnergy: number;
    cosFi: number;
    peakDemand: number;
    cost: number | null;
}

export function calculateCostsOverviewItem(
    source: CostlyQuantitiesOverviewItem,
    calc: ERUCalculator | null
): CostsOverviewItem {
    const cost = calc !== null ? calcCost(source, calc) : null;

    const activeEnergy = sum(source.activeEnergyInMonths ?? []);
    const reactiveEnergy = sum(source.reactiveEnergyInMonths ?? []);
    const peakDemand = Math.max(...(source.peakDemandInMonths ?? []));
    const cosFi = Math.min(...(source.cosFiInMonths ?? []));

    return {
        groupId: source.groupId ?? '(no id)',
        groupName: source.groupName ?? '(no name)',
        intervalStart: source.interval?.start ?? new Date(NaN),
        intervalEnd: source.interval?.end ?? new Date(NaN),
        activeEnergy: toUnitPrefix(activeEnergy, 'Mega'),
        reactiveEnergy: toUnitPrefix(reactiveEnergy, 'Mega'),
        peakDemand: toUnitPrefix(peakDemand, 'Mega'),
        cosFi: cosFi,
        cost
    };
}

function calcCost(source: CostlyQuantitiesOverviewItem, calc: ERUCalculator) {
    const costInMonths = zip(
        source.activeEnergyInMonths ?? [],
        source.reactiveEnergyInMonths ?? [],
        source.peakDemandInMonths ?? [],
        source.cosFiInMonths ?? []
    ).map(([ep, eq, pmax, cosFi]) => {
        const rpo = calc.reservedPowerOverrun(toUnitPrefix(pmax, 'Kilo'));
        const rpoCost = calc.reservedPowerOverrunCost(rpo);

        const rco = calc.reservedCapacityOverrun(toUnitPrefix(pmax, 'Kilo'));
        const rcoCost = calc.reservedCapacityOverrunCost(rco);

        const resCost = calc.reactiveEnergySupplyCost(toUnitPrefix(eq, 'Mega'));

        const mrcCost = calc.monthlyReservedCapacityCost();
        const yrcCost = calc.yearlyReservedCapacityCost();

        const u = calc.powerFactorSurcharge(cosFi);
        const pfPenalty = calc.powerFactorPenalty(
            toUnitPrefix(pmax, 'Mega'),
            u,
            toUnitPrefix(ep, 'Mega')
        );

        return rpoCost + rcoCost + resCost + mrcCost + yrcCost + pfPenalty;
    });

    return sum(costInMonths);
}
