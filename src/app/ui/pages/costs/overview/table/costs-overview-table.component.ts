import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import ERUCalculatorFactory from 'src/app/core/costs/ERUCalculatorFactory';
import { AppState } from 'src/app/ui/store/app-store.state';
import {
    CostsOverviewTable,
    selectOverviewTable
} from 'src/app/ui/store/costs-overview/costs-overview.selectors';

@Component({
    selector: 'app-costs-overview-table',
    templateUrl: './costs-overview-table.component.html',
    styleUrls: ['./costs-overview-table.component.scss']
})
export class CostsOverviewTableComponent {
    table$: Observable<CostsOverviewTable | null>;

    constructor(
        private store: Store<AppState>,
        private calculatorFactory: ERUCalculatorFactory
    ) {
        this.table$ = this.store.pipe(
            select(selectOverviewTable, { calculatorFactory })
        );
    }
}
