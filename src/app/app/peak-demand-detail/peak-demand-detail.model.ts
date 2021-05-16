import { HttpErrorResponse } from '@angular/common/http';
import { DemandAggregation } from 'src/app/web-api-client';
import { ViewType } from '../common/models';

export interface DemandSeries {
    timeRange: Interval;
    timeStep: number;
    valuesMain: number[] | null;
    valuesL1: number[] | null;
    valuesL2: number[] | null;
    valuesL3: number[] | null;
    length: number;
}
export interface PeakDemandDetailState {
    viewType: ViewType;
    aggregation: DemandAggregation;
    series1: DemandSeries | null;
    series2: DemandSeries | null;
    interval1: Interval | null;
    interval2: Interval | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
