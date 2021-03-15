import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { dataSourceReducer } from 'src/app/ui/store/data-source/data-source.reducer';
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

    constructor(private store: Store<AppState>, private router: Router) {
        this.chart$ = this.store.pipe(select(selectOverviewChart));
    }

    customizeTooltip = (args: {
        value: number;
        seriesName: string;
    }): { text: string } => {
        return {
            text: `${args.seriesName} = ${Math.abs(+args.value)}`
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

    async handleClick(event: {
        target?: { data?: { groupId?: string } };
    }): Promise<void> {
        console.log(event);
        const groupId = event.target?.data?.groupId;
        if (groupId) {
            await this.router.navigate(['power-factor', 'detail', groupId]);
        }
    }
}
