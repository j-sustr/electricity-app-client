import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import { setAggregation } from 'src/app/app/peak-demand-detail/peak-demand-detail.actions';
import { selectAggregation } from 'src/app/app/peak-demand-detail/peak-demand-detail.selectors';
import { DemandAggregation } from 'src/app/web-api-client';

interface AggregationOption {
    name: string;
    key: number;
}

@Component({
    selector: 'app-aggregation-input',
    templateUrl: './aggregation-input.component.html',
    styleUrls: ['./aggregation-input.component.scss']
})
export class AggregationInputComponent {
    options: AggregationOption[] = [
        {
            name: 'None',
            key: DemandAggregation.None
        },
        {
            name: '1 Hour',
            key: DemandAggregation.OneHour
        },
        {
            name: '6 Hours',
            key: DemandAggregation.SixHours
        },
        {
            name: '12 Hours',
            key: DemandAggregation.TwelveHours
        },
        {
            name: '1 Day',
            key: DemandAggregation.OneDay
        },
        {
            name: '1 Week',
            key: DemandAggregation.OneWeek
        }
    ];

    value$: Observable<DemandAggregation>;

    constructor(private store: Store<AppState>) {
        this.value$ = this.store.pipe(select(selectAggregation));
    }

    handleValueChange(event: { value: DemandAggregation }): void {
        console.log(event);
        this.store.dispatch(
            setAggregation({
                aggregation: event.value
            })
        );
    }
}
