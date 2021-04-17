import { HttpErrorResponse } from '@angular/common/http';
import { PeakDemandDetailData } from 'src/app/web-api-client';
import { ViewType } from '../common/models';

export interface PeakDemandDetailState {
    viewType: ViewType;
    data1: PeakDemandDetailData | null;
    data2: PeakDemandDetailData | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
