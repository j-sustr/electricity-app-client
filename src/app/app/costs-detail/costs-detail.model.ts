import { HttpErrorResponse } from '@angular/common/http';
import { CostlyQuantitiesDetailItem } from 'src/app/web-api-client';

export interface CostsDetailState {
    groupName: string | null;
    items1: CostlyQuantitiesDetailItem[] | null;
    items2: CostlyQuantitiesDetailItem[] | null;
    interval1: Interval | null;
    interval2: Interval | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
