import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app/app-store.state';
import {
    PeakDemandDetailChart,
    selectDetailChart
} from 'src/app/app/peak-demand-detail/peak-demand-detail.selectors';

@Component({
    selector: 'app-peak-demand-detail-chart',
    templateUrl: './peak-demand-detail-chart.component.html',
    styleUrls: ['./peak-demand-detail-chart.component.scss']
})
export class PeakDemandDetailChartComponent {
    // highAverage = 77;
    // lowAverage = 58;

    chart$: Observable<PeakDemandDetailChart | null>;

    constructor(store: Store<AppState>) {
        this.chart$ = store.pipe(
            select(selectDetailChart),
            tap((chart) => {
                // console.log('peak demand chart', chart);
            })
        );
    }

    customizeTooltip = (args: { valueText: string }): unknown => {
        return {
            text: args.valueText + ' kW'
        };
    };

    customizePoint = (arg: { value: number }): unknown => {
        // if (arg.value > this.highAverage) {
        //     return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } };
        // } else if (arg.value < this.lowAverage) {
        //     return { color: '#8c8cff', hoverStyle: { color: '#8c8cff' } };
        // }
        return undefined;
    };

    customizeLabel = (arg: { value: number }): unknown => {
        // if (arg.value > this.highAverage) {
        //     return {
        //         visible: true,
        //         backgroundColor: '#ff7c7c',
        //         customizeText: function (e: { valueText: string }) {
        //             return e.valueText + '&#176F';
        //         }
        //     };
        // }
        return undefined;
    };

    customizeText = (arg: { valueText: string }): string => {
        return arg.valueText + ' kW';
    };
}
