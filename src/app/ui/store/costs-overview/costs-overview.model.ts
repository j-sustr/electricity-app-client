import { HttpErrorResponse } from '@angular/common/http';
import { SeriesParams } from '../models';

export interface CostsOverviewItem {
    activeEnergy: number;
    reactiveEnergy: number;
    cosFi: number;
    peakDemand: number;
    cost: number;
}

export interface CostsOverviewState {
    items: CostsOverviewItem[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
