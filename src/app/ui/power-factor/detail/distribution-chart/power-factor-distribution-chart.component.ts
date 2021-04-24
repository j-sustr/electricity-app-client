import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app/app-store.state';
import {
    getRangeDistribution,
    popDistributionStack,
    resetDistributionRange
} from 'src/app/app/power-factor-detail/power-factor-detail.actions';
import {
    PowerFactorDistributionChart,
    PowerFactorDistributionChartItem,
    selectDistributionChart
} from 'src/app/app/power-factor-detail/power-factor-distribution.selectors';

@Component({
    selector: 'app-power-factor-distribution-chart',
    templateUrl: './power-factor-distribution-chart.component.html',
    styleUrls: ['./power-factor-distribution-chart.component.scss']
})
export class PowerFactorDistributionChartComponent {
    colors = ['#6babac', '#e55253'];

    private level = 0;

    private get isFirstLevel(): boolean {
        return this.level === 0;
    }

    chart$: Observable<PowerFactorDistributionChart | null>;

    constructor(private store: Store<AppState>) {
        this.chart$ = store.pipe(
            select(selectDistributionChart),
            tap((chart) => {
                console.log(chart);
                this.level = chart?.level ?? NaN;
            })
        );
    }

    customizePoint = (): unknown => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pointSettings: any = {
            color: this.colors[Number(this.isFirstLevel)]
        };

        if (!this.isFirstLevel) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            pointSettings.hoverStyle = {
                hatching: 'none'
            };
        }

        return pointSettings;
    };

    customizeTooltip = (args: { valueText: string }): { text: string } => {
        return {
            text: args.valueText
        };
    };

    customizeLabel = (args: { valueText: string }): string => {
        return args.valueText + '%';
    };

    handlePointClick(e: {
        target: { data: PowerFactorDistributionChartItem };
    }): void {
        this.store.dispatch(
            getRangeDistribution({
                start: e.target.data.range.start ?? -Infinity,
                end: e.target.data.range.end ?? Infinity
            })
        );
    }

    handleBackClick(): void {
        this.store.dispatch(popDistributionStack());
    }

    handleHomeClick(): void {
        this.store.dispatch(resetDistributionRange());
    }
}
