import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app-store.state';
import { selectIsAuthenticated } from './store/auth/auth.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-electricity-app';

    isAuthenticated$: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    }
}
