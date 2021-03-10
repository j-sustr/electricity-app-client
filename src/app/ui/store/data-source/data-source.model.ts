import { HttpErrorResponse } from '@angular/common/http';

export type Phases = {
    main: boolean;
    l1: boolean;
    l2: boolean;
    l3: boolean;
};

export interface DataSourceState {
    interval1: Interval;
    interval2?: Interval;
    phases: Phases;
    info?: {
        minDatetime: Date;
        maxDatetime: Date;
    };
    loading: boolean;
    error?: HttpErrorResponse;
}
