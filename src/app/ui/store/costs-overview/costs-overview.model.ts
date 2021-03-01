import { HttpErrorResponse } from '@angular/common/http';

export interface CostsOverviewItem {
    groupName: string;
    activeEnergy: number;
    reactiveEnergy: number;
    cosFi: number;
    peakDemand: number;
    cost: number | null;
}

export interface CostsOverviewState {
    items: CostsOverviewItem[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
