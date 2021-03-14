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

    customizeTooltip = (args: { value: number }): { text: string } => {
        return {
            text: Math.abs(+args.value).toString()
        };
    };

    customizeLabel = (args: { valueText: string }): string => {
        const text = args.valueText;
        if (text === '0') {
            return text;
        }
        if (text.startsWith('-')) {
            return text + 'VArh';
        }
        return text + 'Wh';
    };
}
