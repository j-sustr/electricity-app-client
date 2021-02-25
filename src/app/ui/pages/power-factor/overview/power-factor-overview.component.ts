import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { actionPowerFactorOverviewGetData } from 'src/app/ui/store/power-factor-overview/power-factor-overview.actions';
import { PowerFactorOverviewState } from 'src/app/ui/store/power-factor-overview/power-factor-overview.model';
import { selectPowerFactorOverview } from 'src/app/ui/store/power-factor-overview/power-factor-overview.selectors';

@Component({
    selector: 'app-power-factor-overview',
    templateUrl: './power-factor-overview.component.html',
    styleUrls: ['./power-factor-overview.component.scss']
})
export class PowerFactorOverviewComponent implements OnInit {
    state$: Observable<PowerFactorOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectPowerFactorOverview));
    }

    ngOnInit(): void {
        this.store.dispatch(actionPowerFactorOverviewGetData());
    }
}
