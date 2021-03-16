import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-store.state';
import {
    PowerFactorDistributionTable,
    selectDistributionTable
} from 'src/app/store/power-factor-detail/power-factor-distribution.selectors';

@Component({
    selector: 'app-power-factor-distribution-table',
    templateUrl: './power-factor-distribution-table.component.html',
    styleUrls: ['./power-factor-distribution-table.component.scss']
})
export class PowerFactorDistributionTableComponent {
    table$: Observable<PowerFactorDistributionTable | null>;

    constructor(store: Store<AppState>) {
        this.table$ = store.pipe(select(selectDistributionTable));
    }
}
