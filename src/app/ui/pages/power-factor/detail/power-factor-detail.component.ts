import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import { PowerFactorDetailState } from 'src/app/app/power-factor-detail/power-factor-detail.model';
import { selectDetail } from 'src/app/app/power-factor-detail/power-factor-detail.selectors';

@Component({
    selector: 'app-power-factor-detail',
    templateUrl: './power-factor-detail.component.html',
    styleUrls: ['./power-factor-detail.component.scss']
})
export class PowerFactorDetailComponent {
    state$: Observable<PowerFactorDetailState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectDetail));
    }
}
