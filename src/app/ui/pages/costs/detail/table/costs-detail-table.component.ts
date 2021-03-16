import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import ERUCalculatorFactory from 'src/app/core/costs/ERUCalculatorFactory';
import { AppState } from 'src/app/store/app-store.state';
import {
    CostsDetailTable,
    selectDetailTable
} from 'src/app/store/costs-detail/costs-detail.selectors';

@Component({
    selector: 'app-costs-detail-table',
    templateUrl: './costs-detail-table.component.html',
    styleUrls: ['./costs-detail-table.component.scss']
})
export class CostsDetailTableComponent {
    table$: Observable<CostsDetailTable | null>;

    constructor(
        private store: Store<AppState>,
        private calculatorFactory: ERUCalculatorFactory
    ) {
        this.table$ = this.store.pipe(
            select(selectDetailTable, { calculatorFactory })
        );
    }
}
