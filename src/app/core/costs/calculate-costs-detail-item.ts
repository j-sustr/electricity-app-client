import { CostsDetailItem } from 'src/app/ui/store/costs-detail/costs-detail.model';
import { CostlyQuantitiesDetailItem } from 'src/app/web-api-client';
import { calcCosFi } from './costs-utils';
import ERUCalculator from './ERUCalculator';

export function calculateCostsDetailItem(
    source: CostlyQuantitiesDetailItem,
    calc: ERUCalculator | null
): CostsDetailItem {
    const cosFi = calcCosFi(
        source.activeEnergy ?? NaN,
        source.reactiveEnergy ?? NaN
    );
    
    const currency = 'CZK';
    return {
        year: source.year ?? NaN,
        month: source.month ?? NaN,
        activeEnergy: {
            itemName: 'Active Energy',
            quantity: source.activeEnergy ?? NaN,
        },
        reactiveEnergy: {
            itemName: 'Reactive Energy',
            quantity: source.reactiveEnergy ?? NaN,
            currency,
            unit: 'MVArh',
            costPerUnit: calc?.reactiveEnergySupplyCostPerUnit,
            cost: calc?.reactiveEnergySupplyCost(source.reactiveEnergy ?? NaN),
        },
        cosFi: { 
            itemName: 'Cos Fi',
            quantity: cosFi,
            costPerUnit: calc.
        },
        
    };
}
