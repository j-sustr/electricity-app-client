import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app/app-store.state';
import { selectIsAuthenticated } from './app/auth/auth.selectors';
import { AuthService } from './app/auth/auth.service';
import {
    DataSourceClient,
    DBDataSourceClient,
    GroupsClient
} from './web-api-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-electricity-app';

    isAuthenticated$: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
        private authService: AuthService,
        private groupsClient: GroupsClient,
        private dataSourceClient: DataSourceClient,
        private dbDataSourceClient: DBDataSourceClient
    ) {
        this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (window as any).authService = authService;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (window as any).groupsClient = groupsClient;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (window as any).dataSourceClient = dataSourceClient;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (window as any).dbDataSourceClient = dbDataSourceClient;
    }
}
