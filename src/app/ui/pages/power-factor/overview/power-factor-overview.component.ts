import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-store.state';
import { PowerFactorOverviewState } from 'src/app/store/power-factor-overview/power-factor-overview.model';
import { selectOverview } from 'src/app/store/power-factor-overview/power-factor-overview.selectors';

@Component({
    selector: 'app-power-factor-overview',
    templateUrl: './power-factor-overview.component.html',
    styleUrls: ['./power-factor-overview.component.scss']
})
export class PowerFactorOverviewComponent {
    state$: Observable<PowerFactorOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectOverview));
    }
}
