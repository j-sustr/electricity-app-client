import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ui/store/app-store.state';
import { CostsDetailState } from 'src/app/ui/store/costs-detail/costs-detail.model';
import { selectDetail } from 'src/app/ui/store/costs-detail/costs-detail.selectors';

@Component({
    selector: 'app-costs-detail',
    templateUrl: './costs-detail.component.html',
    styleUrls: ['./costs-detail.component.scss']
})
export class CostsDetailComponent {
    state$: Observable<CostsDetailState>;

    constructor(private store: Store<AppState>) {
        this.state$ = this.store.pipe(select(selectDetail));
    }
}
