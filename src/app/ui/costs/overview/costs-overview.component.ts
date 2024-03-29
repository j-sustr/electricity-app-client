import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import { CostsOverviewState } from 'src/app/app/costs-overview/costs-overview.model';
import { selectOverview } from 'src/app/app/costs-overview/costs-overview.selectors';
import { setIsCustomerParamsPopupFormOpen } from 'src/app/app/costs/costs.actions';
import { selectHasCustomerParams } from 'src/app/app/costs/costs.selectors';

@Component({
    selector: 'app-costs-overview',
    templateUrl: './costs-overview.component.html',
    styleUrls: ['./costs-overview.component.scss']
})
export class CostsOverviewComponent {
    hasCustomerParams$: Observable<boolean>;
    state$: Observable<CostsOverviewState | null>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectOverview));
        this.hasCustomerParams$ = this.store.pipe(
            select(selectHasCustomerParams)
        );
    }

    handleCustomerParamsBtnClick(): void {
        this.store.dispatch(
            setIsCustomerParamsPopupFormOpen({
                open: true
            })
        );
    }
}
