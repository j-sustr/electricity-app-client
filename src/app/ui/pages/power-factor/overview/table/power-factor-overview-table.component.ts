import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { PowerFactorOverviewState } from 'src/app/ui/store/power-factor-overview/power-factor-overview.model';
import { selectPowerFactorOverview } from 'src/app/ui/store/power-factor-overview/power-factor-overview.selectors';

@Component({
    selector: 'app-power-factor-overview-table',
    templateUrl: './power-factor-overview-table.component.html',
    styleUrls: ['./power-factor-overview-table.component.scss']
})
export class PowerFactorOverviewTableComponent {
    state$: Observable<PowerFactorOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectPowerFactorOverview));
    }
}
