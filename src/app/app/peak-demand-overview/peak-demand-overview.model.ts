import { HttpErrorResponse } from '@angular/common/http';
import { PeakDemandOverviewItem } from 'src/app/web-api-client';
import { ViewType } from '../common/models';

export interface PeakDemandOverviewState {
    viewType: ViewType;
    items1: PeakDemandOverviewItem[] | null;
    items2: PeakDemandOverviewItem[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
