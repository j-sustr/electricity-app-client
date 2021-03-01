import { HttpErrorResponse } from '@angular/common/http';

export interface CostItem {
    itemName: string;
    quantity: number;
    unit?: string;
    currency?: string;
    costPerUnit?: number;
    cost?: number;
}

export interface CostsDetailItem {
    year: number;
    month: number;
    reservedCapacity: CostItem;
    cosFi: CostItem;
    reservedCapacityOverrun: CostItem;
    reservedPowerOverrun: CostItem;
    reactiveEnergy: CostItem;
    activeEnergy: CostItem;
    yearlyReservedCapacity: CostItem;
    monthlyReservedCapacity: CostItem;
    powerFactorNonCompliance: CostItem;
}

export interface CostsDetailState {
    groupName: string;
    items: CostsDetailItem[] | null;
    loading: boolean;
    error?: HttpErrorResponse | null;
}
