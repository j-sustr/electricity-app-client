import { HttpErrorResponse } from '@angular/common/http';

export interface CostsDetailItem {
    year: number;
    month: string;
    itemName: string;
    quantity: string;
    unit?: string;
    currency?: string;
    costPerUnit?: number;
    cost?: number;
}

export interface CostsDetailState {
    groupName: string | null;
    items: CostsDetailItem[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
