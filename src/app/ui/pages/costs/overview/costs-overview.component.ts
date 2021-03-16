import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-store.state';
import { CostsOverviewState } from 'src/app/store/costs-overview/costs-overview.model';
import { selectOverview } from 'src/app/store/costs-overview/costs-overview.selectors';
import { selectHasCustomerParams } from 'src/app/store/costs/costs.selectors';

@Component({
    selector: 'app-costs-overview',
    templateUrl: './costs-overview.component.html',
    styleUrls: ['./costs-overview.component.scss']
})
export class CostsOverviewComponent {
    popupVisible = false;

    hasCustomerParams$: Observable<boolean>;
    state$: Observable<CostsOverviewState | null>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectOverview));
        this.hasCustomerParams$ = this.store.pipe(
            select(selectHasCustomerParams)
        );
    }

    handlePopupVisibleChanged(event: boolean): void {
        this.popupVisible = event;
    }

    handleFormSubmitted(): void {
        this.popupVisible = false;
    }
}
