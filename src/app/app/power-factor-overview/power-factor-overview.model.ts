import { HttpErrorResponse } from '@angular/common/http';
import { PowerFactorOverviewItem } from 'src/app/web-api-client';
import { ViewType } from '../models';

export interface PowerFactorOverviewState {
    viewType: ViewType;
    showEnergy: boolean;
    items1: PowerFactorOverviewItem[] | null;
    items2: PowerFactorOverviewItem[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
