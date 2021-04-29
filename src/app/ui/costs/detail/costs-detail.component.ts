import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import { CostsDetailState } from 'src/app/app/costs-detail/costs-detail.model';
import { selectDetail } from 'src/app/app/costs-detail/costs-detail.selectors';
import { setIsCustomerParamsPopupFormOpen } from 'src/app/app/costs/costs.actions';
import { selectHasCustomerParams } from 'src/app/app/costs/costs.selectors';

@Component({
    selector: 'app-costs-detail',
    templateUrl: './costs-detail.component.html',
    styleUrls: ['./costs-detail.component.scss']
})
export class CostsDetailComponent {
    hasCustomerParams$: Observable<boolean>;
    state$: Observable<CostsDetailState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectDetail));
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
