import { HttpErrorResponse } from '@angular/common/http';
import { PowerFactorDistributionItem } from 'src/app/web-api-client';
import { ViewType } from '../models';

const DETAIL_TYPES = ['distribution', 'time-series'] as const;
export type DetailType = typeof DETAIL_TYPES[number];

export interface PowerFactorDistribution {
    items1: PowerFactorDistributionItem[] | null;
    items2: PowerFactorDistributionItem[] | null;
}

export interface PowerFactorDetailState {
    detailType: DetailType;
    viewType: ViewType;
    showEnergy: boolean;
    distribution: PowerFactorDistribution | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
