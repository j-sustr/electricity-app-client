import { CostsOverviewItem } from 'src/app/ui/store/costs-overview/costs-overview.model';
import { CostlyQuantitiesOverviewItem } from 'src/app/web-api-client';
import ERUCalculator from './ERUCalculator';

export function calculateCostsOverviewItem(
    source: CostlyQuantitiesOverviewItem,
    calculator: ERUCalculator
): CostsOverviewItem {
    throw Error('not implemented');
}
