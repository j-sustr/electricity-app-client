import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { CostsOverviewState } from 'src/app/ui/store/costs-overview/costs-overview.model';
import { selectOverview } from 'src/app/ui/store/costs-overview/costs-overview.selectors';

@Component({
    selector: 'app-costs-overview-table',
    templateUrl: './costs-overview-table.component.html',
    styleUrls: ['./costs-overview-table.component.scss']
})
export class CostsOverviewTableComponent {
    state$: Observable<CostsOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectOverview));
    }
}
