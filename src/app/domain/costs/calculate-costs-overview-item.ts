import { sum, zip } from 'src/app/common/array/array-utils';
import { toKilo, toMega } from 'src/app/common/number/number-utils';
import { CostlyQuantitiesOverviewItem } from 'src/app/web-api-client';
import ERUCalculator from './ERUCalculator';

export interface CostsOverviewItem {
    groupId: string;
    groupName: string;
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

    return {
        groupId: source.groupId ?? '(no id)',
        groupName: source.groupName ?? '(no name)',
        activeEnergy: sum(source.activeEnergyInMonths ?? []),
        reactiveEnergy: sum(source.reactiveEnergyInMonths ?? []),
        peakDemand: Math.max(...(source.peakDemandInMonths ?? [])),
        cosFi: Math.min(...(source.cosFiInMonths ?? [])),
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
        const rpo = calc.reservedPowerOverrun(toKilo(pmax));
        const rpoCost = calc.reservedPowerOverrunCost(rpo);

        const rco = calc.reservedCapacityOverrun(pmax);
        const rcoCost = calc.reservedCapacityOverrunCost(rco);

        const resCost = calc.reactiveEnergySupplyCost(toMega(eq));

        const mrcCost = calc.monthlyReservedCapacityCost();
        const yrcCost = calc.yearlyReservedCapacityCost();

        const u = calc.powerFactorSurcharge(cosFi);
        const pfPenalty = calc.powerFactorPenalty(toMega(pmax), u, toMega(ep));

        return rpoCost + rcoCost + resCost + mrcCost + yrcCost + pfPenalty;
    });

    return sum(costInMonths);
}
