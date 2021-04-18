import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import {
    PeakDemandOverviewTable,
    selectOverviewTable
} from 'src/app/app/peak-demand-overview/peak-demand-overview.selectors';

@Component({
    selector: 'app-peak-demand-overview-table',
    templateUrl: './peak-demand-overview-table.component.html',
    styleUrls: ['./peak-demand-overview-table.component.scss']
})
export class PeakDemandOverviewTableComponent {
    table$: Observable<PeakDemandOverviewTable | null>;

    constructor(private store: Store<AppState>) {
        this.table$ = this.store.pipe(select(selectOverviewTable));
    }
}
