import { HttpErrorResponse } from '@angular/common/http';
import { PowerFactorOverviewItem } from 'src/app/web-api-client';
import { SeriesParams } from '../models';

export interface PowerFactorOverviewState {
    viewType: 'table' | 'chart';
    showEnergy: boolean;
    items: PowerFactorOverviewItem[] | null;
    series: SeriesParams[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
