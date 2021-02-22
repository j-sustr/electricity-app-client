import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { SeriesParams } from 'src/app/ui/store/models';
import { actionPowerFactorOverviewGetData } from 'src/app/ui/store/power-factor-overview/power-factor-overview.actions';
import {
    selectPFOverviewViewItems,
    selectPFOverviewViewLoading,
    selectPFOverviewViewSeries
} from 'src/app/ui/store/power-factor-overview/power-factor-overview.selectors';
import { PowerFactorOverviewItem } from 'src/app/web-api-client';

@Component({
    selector: 'app-power-factor-overview',
    templateUrl: './power-factor-overview.component.html',
    styleUrls: ['./power-factor-overview.component.scss']
})
export class PowerFactorOverviewComponent implements OnInit {
    items$: Observable<PowerFactorOverviewItem[] | null>;
    series$: Observable<SeriesParams[] | null>;
    loading$: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.items$ = this.store.pipe(select(selectPFOverviewViewItems));
        this.series$ = this.store.pipe(select(selectPFOverviewViewSeries));
        this.loading$ = this.store.pipe(select(selectPFOverviewViewLoading));
    }

    ngOnInit(): void {
        this.store.dispatch(actionPowerFactorOverviewGetData());
    }
}
