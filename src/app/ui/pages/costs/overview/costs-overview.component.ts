import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { CostsOverviewState } from 'src/app/ui/store/costs-overview/costs-overview.model';
import { selectOverview } from 'src/app/ui/store/costs-overview/costs-overview.selectors';

@Component({
    selector: 'app-costs-overview',
    templateUrl: './costs-overview.component.html',
    styleUrls: ['./costs-overview.component.scss']
})
export class CostsOverviewComponent {
    popupVisible = true;

    state$: Observable<CostsOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectOverview));
        // this.state$.pipe(take(1)).subscribe((state) => {
        //     if (state.items === null || state.items.length === 0) {
        //         this.store.dispatch(getOverview());
        //     }
        // });
    }

    handleFormSubmitted(): void {
        this.popupVisible = false;
    }
}
