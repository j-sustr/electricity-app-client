import { HttpErrorResponse } from '@angular/common/http';
import { CostlyQuantitiesOverviewItem } from 'src/app/web-api-client';

export interface CostsOverviewState {
    items1: CostlyQuantitiesOverviewItem[] | null;
    items2: CostlyQuantitiesOverviewItem[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
