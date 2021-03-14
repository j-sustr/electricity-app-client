export interface SeriesParams {
    name: string;
    valueField: string;
    unit: string;
    color: string;
    stack: 1 | 2;
    axis?: string;
    type?: string;
    // filter: string;
}

export type ViewType = 'table' | 'chart';
