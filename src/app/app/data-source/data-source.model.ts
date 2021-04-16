import { HttpErrorResponse } from '@angular/common/http';

export type Phases = {
    main: boolean;
    l1: boolean;
    l2: boolean;
    l3: boolean;
};

export interface DataSourceState {
    datasourceName: string | null;
    interval1: Interval;
    interval2?: Interval;
    phases: Phases;
    loading: boolean;
    error?: HttpErrorResponse;
}
