import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import { PeakDemandDetailState } from 'src/app/app/peak-demand-detail/peak-demand-detail.model';
import { selectDetail } from 'src/app/app/peak-demand-detail/peak-demand-detail.selectors';

@Component({
    selector: 'app-peak-demand-detail',
    templateUrl: './peak-demand-detail.component.html',
    styleUrls: ['./peak-demand-detail.component.scss']
})
export class PeakDemandDetailComponent {
    state$: Observable<PeakDemandDetailState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectDetail));
    }
}
