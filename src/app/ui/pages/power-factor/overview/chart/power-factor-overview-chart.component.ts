import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { PowerFactorOverviewState } from 'src/app/ui/store/power-factor-overview/power-factor-overview.model';
import { selectOverview } from 'src/app/ui/store/power-factor-overview/power-factor-overview.selectors';

@Component({
    selector: 'app-power-factor-overview-chart',
    templateUrl: './power-factor-overview-chart.component.html',
    styleUrls: ['./power-factor-overview-chart.component.scss']
})
export class PowerFactorOverviewChartComponent {
    state$: Observable<PowerFactorOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectOverview));
    }
}
