import { HttpErrorResponse } from '@angular/common/http';
import { PowerFactorDistributionItem } from 'src/app/web-api-client';
import { ViewType } from '../models';

export interface PowerFactorDistribution {
    items1: PowerFactorDistributionItem[] | null;
    items2: PowerFactorDistributionItem[] | null;
}

export interface PowerFactorDetailState {
    viewType: ViewType;
    showEnergy: boolean;
    distribution: PowerFactorDistribution | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
