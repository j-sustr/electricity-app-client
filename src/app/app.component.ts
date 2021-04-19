import { AfterViewInit, Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppState } from './app/app-store.state';
import { selectIsAuthenticated } from './app/auth/auth.selectors';
import { AuthService } from './app/auth/auth.service';
import { getUserGroupTree } from './app/groups/groups.actions';
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
export class AppComponent implements AfterViewInit {
    title = 'angular-electricity-app';

    isAuthenticated$: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject,
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

    ngAfterViewInit(): void {
        this.authService
            .getIsAuthenticated()
            .pipe(
                tap((isAuthenticated) => {
                    if (isAuthenticated) {
                        this.store.dispatch(getUserGroupTree());
                        return;
                    }
                    if (!environment.production) {
                        void import('./dev-login').then((module) => {
                            module.devLogin(this.store, this.actionsSubject);
                        });
                    }
                })
            )
            .subscribe();
    }
}
