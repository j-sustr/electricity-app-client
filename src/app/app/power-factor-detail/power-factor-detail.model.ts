import { HttpErrorResponse } from '@angular/common/http';
import { PowerFactorDistributionItem } from 'src/app/web-api-client';
import { ViewType } from '../common/models';

const DETAIL_TYPES = ['distribution', 'time-series'] as const;
export type DetailType = typeof DETAIL_TYPES[number];

export interface DistributionRange {
    start: number;
    end: number;
}

export interface PowerFactorDistribution {
    items1: PowerFactorDistributionItem[] | null;
    items2: PowerFactorDistributionItem[] | null;
    range: DistributionRange | null;
}

export interface PowerFactorDetailState {
    detailType: DetailType;
    viewType: ViewType;
    showEnergy: boolean;
    distributionStack: PowerFactorDistribution[] | null;
    interval1: Interval | null;
    interval2: Interval | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
