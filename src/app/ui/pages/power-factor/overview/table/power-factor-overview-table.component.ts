import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AppState } from 'src/app/ui/store/app-store.state';
import { selectPFOverviewViewItems } from 'src/app/ui/store/power-factor-overview/power-factor-overview.selectors';
import { PowerFactorOverviewItem } from 'src/app/web-api-client';

@Component({
    selector: 'app-power-factor-overview-table',
    templateUrl: './power-factor-overview-table.component.html',
    styleUrls: ['./power-factor-overview-table.component.scss']
})
export class PowerFactorOverviewTableComponent {
    items$: Observable<PowerFactorOverviewItem[]>;

    constructor(private store: Store<AppState>) {
        this.items$ = this.store.pipe(
            select(selectPFOverviewViewItems),
            map((items) => {
                return items ?? [];
            })
        );
    }
}
