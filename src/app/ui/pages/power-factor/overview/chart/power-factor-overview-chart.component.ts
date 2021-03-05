import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import {
    PowerFactorOverviewChart,
    selectOverviewChart
} from 'src/app/ui/store/power-factor-overview/power-factor-overview.selectors';

@Component({
    selector: 'app-power-factor-overview-chart',
    templateUrl: './power-factor-overview-chart.component.html',
    styleUrls: ['./power-factor-overview-chart.component.scss']
})
export class PowerFactorOverviewChartComponent {
    chart$: Observable<PowerFactorOverviewChart | null>;

    constructor(private store: Store<AppState>) {
        this.chart$ = this.store.pipe(select(selectOverviewChart));
    }

    customizeTooltip = (args: unknown) => {
        console.log(args);
        return {
            text: ''
        };
    };

    customizeLabel = (args: unknown) => {
        console.log(args);
        return '';
    };
}
