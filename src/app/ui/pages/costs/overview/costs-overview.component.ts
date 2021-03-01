import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { getOverview } from 'src/app/ui/store/costs-overview/costs-overview.actions';
import { CostsOverviewState } from 'src/app/ui/store/costs-overview/costs-overview.model';
import { selectCostsOverview } from 'src/app/ui/store/costs-overview/costs-overview.selectors';

@Component({
    selector: 'app-costs-overview',
    templateUrl: './costs-overview.component.html',
    styleUrls: ['./costs-overview.component.scss']
})
export class CostsOverviewComponent implements OnInit {
    state$: Observable<CostsOverviewState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectCostsOverview));
    }

    ngOnInit(): void {
        this.store.dispatch(getOverview());
    }
}
