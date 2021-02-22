export interface PowerFactorOverviewItem {
    deviceName?: string | null;
    activeEnergy?: number;
    reactiveEnergyL?: number;
    reactiveEnergyC?: number;
    tanFi?: number;
    interval?: Interval | null;
}

export interface PowerFactorOverviewState {
    viewType: 'table' | 'chart';
    showEnergy: boolean;
    view: {
        data: PowerFactorOverviewItem[];
        series: {
            name: string;
            valueField: string;
            unit: string;
            // filter: string;
        }[];
    };
    loading: boolean;
    error: boolean;
}
