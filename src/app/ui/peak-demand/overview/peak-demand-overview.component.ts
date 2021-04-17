import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import { PeakDemandOverviewState } from 'src/app/app/peak-demand-overview/peak-demand-overview.model';
import { selectOverview } from 'src/app/app/peak-demand-overview/peak-demand-overview.selectors';

@Component({
    selector: 'app-peak-demand-overview',
    templateUrl: './peak-demand-overview.component.html',
    styleUrls: ['./peak-demand-overview.component.scss']
})
export class PeakDemandOverviewComponent {
    state$: Observable<PeakDemandOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectOverview));
    }
}
