import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-store.state';
import {
    PowerFactorDistributionChart,
    selectDistributionChart
} from 'src/app/store/power-factor-detail/power-factor-distribution.selectors';

@Component({
    selector: 'app-power-factor-distribution-chart',
    templateUrl: './power-factor-distribution-chart.component.html',
    styleUrls: ['./power-factor-distribution-chart.component.scss']
})
export class PowerFactorDistributionChartComponent {
    chart$: Observable<PowerFactorDistributionChart | null>;

    constructor(store: Store<AppState>) {
        this.chart$ = store.pipe(select(selectDistributionChart));
    }

    customizeTooltip = (args: { valueText: string }): { text: string } => {
        return {
            text: args.valueText
        };
    };

    customizeLabel = (args: { valueText: string }): string => {
        return args.valueText + '%';
    };
}
