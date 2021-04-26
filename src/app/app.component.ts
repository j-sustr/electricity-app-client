/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppState } from './app/app-store.state';
import { selectIsAuthenticated } from './app/auth/auth.selectors';
import { AuthService } from './app/auth/auth.service';
import {
    getDataSourceInfo,
    getDataSourceInfoSuccess
} from './app/data-source/data-source.actions';
import { getUserGroupTree } from './app/groups/groups.actions';
import { selectUserRecordGroupsInterval } from './app/groups/groups.selectors';
import { devLogin } from './dev-login';
import {
    ArchiveClient,
    DataSourceClient,
    DBDataSourceClient,
    GroupsClient,
    PowerFactorClient
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
        private archiveClient: ArchiveClient,
        private groupsClient: GroupsClient,
        private dataSourceClient: DataSourceClient,
        private dbDataSourceClient: DBDataSourceClient,
        private powerFactorClient: PowerFactorClient
    ) {
        this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
        (window as any).authService = authService;
        (window as any).archiveClient = archiveClient;
        (window as any).groupsClient = groupsClient;
        (window as any).dataSourceClient = dataSourceClient;
        (window as any).dbDataSourceClient = dbDataSourceClient;
        (window as any).powerFactorClient = powerFactorClient;

        this.store.pipe(
            select(selectUserRecordGroupsInterval),
            tap((interval) => {
                console.log('selectUserRecordGroupsInterval');
                (window as any).userRecordGroupsInterval = interval;
            })
        );
    }

    ngAfterViewInit(): void {
        this.authService
            .getIsAuthenticated()
            .pipe(
                tap((isAuthenticated) => {
                    if (isAuthenticated) {
                        this.store.dispatch(getDataSourceInfo());
                        this.actionsSubject
                            .pipe(
                                ofType(getDataSourceInfoSuccess),
                                take(1),
                                tap(() => {
                                    this.store.dispatch(getUserGroupTree());
                                })
                            )
                            .subscribe();
                        return;
                    }
                    if (!environment.production) {
                        void devLogin(this.store, this.actionsSubject);
                    }
                })
            )
            .subscribe();
    }
}
