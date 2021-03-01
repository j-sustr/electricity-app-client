import { fn } from '@angular/compiler/src/output/output_ast';
import { avg, sum, zip } from 'src/app/common/array/array-utils';
import { toKilo, toMega } from 'src/app/common/number/number-utils';
import { CostsOverviewItem } from 'src/app/ui/store/costs-overview/costs-overview.model';
import { CostlyQuantitiesOverviewItem } from 'src/app/web-api-client';
import { calcCosFi } from './costs-utils';
import ERUCalculator from './ERUCalculator';

export function calculateCostsOverviewItem(
    source: CostlyQuantitiesOverviewItem,
    calc: ERUCalculator | null
): CostsOverviewItem {
    const cosFiInMonths = zip(
        source.activeEnergyInMonths ?? [],
        source.reactiveEnergyInMonths ?? []
    ).map(([ae, re]) => calcCosFi(ae, re));

    const cost = calc !== null ? calcCost(source, calc) : null;

    return {
        activeEnergy: sum(source.activeEnergyInMonths ?? []),
        reactiveEnergy: sum(source.reactiveEnergyInMonths ?? []),
        peakDemand: Math.max(...(source.peakDemandInMonths ?? [])),
        cosFi: Math.min(...cosFiInMonths),
        cost
    };
}

function calcCost(source: CostlyQuantitiesOverviewItem, calc: ERUCalculator) {
    const costInMonths = zip(
        source.activeEnergyInMonths ?? [],
        source.reactiveEnergyInMonths ?? [],
        source.peakDemandInMonths ?? []
    ).map(([ep, eq, pmax]) => {
        const rpo = calc.reservedPowerOverrun(toKilo(pmax));
        const rpoCost = calc.reservedPowerOverrunCost(rpo);

        const rco = calc.reservedCapacityOverrun(pmax);
        const rcoCost = calc.reservedCapacityOverrunCost(rco);

        const resCost = calc.reactiveEnergySupplyCost(toMega(eq));

        const mrcCost = calc.monthlyReservedCapacityCost();
        const yrcCost = calc.yearlyReservedCapacityCost();

        const cosFi = calcCosFi(ep, eq);
        const u = calc.powerFactorSurcharge(cosFi);
        const pfPenalty = calc.powerFactorPenalty(toMega(pmax), u, toMega(ep));

        return rpoCost + rcoCost + resCost + mrcCost + yrcCost + pfPenalty;
    });

    return sum(costInMonths);
}
