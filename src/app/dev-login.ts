import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { AppState } from './app/app-store.state';
import { login } from './app/auth/auth.actions';
import {
    openDataSource,
    openDataSourceSuccess,
    openDataSourceError
} from './app/data-source/data-source.actions';
import {
    DataSourceType,
    DBConnectionParams,
    TenantDto
} from './web-api-client';

const CREDENTIALS_KEY = 'dev-credentials';

interface DevCredentials {
    db: {
        server: string;
        dbName: string;
        username: string;
        password: string;
    };
    user: {
        username: string;
        password: string;
    };
}

export function devLogin(
    store: Store<AppState>,
    actionsSubject: ActionsSubject
): void {
    const json = localStorage.getItem(CREDENTIALS_KEY);
    if (!json) throw new Error('no dev credentials');

    let credentials: DevCredentials;
    try {
        credentials = JSON.parse(json) as DevCredentials;
    } catch (error) {
        throw new Error('invalid dev credentials');
    }
    if (!credentials?.db?.server) throw new Error('no db dev credentials');
    if (!credentials?.user?.username)
        throw new Error('no user dev credentials');

    store.dispatch(
        openDataSource({
            tenant: new TenantDto({
                dataSourceType: DataSourceType.DB,
                dbConnectionParams: new DBConnectionParams({
                    ...credentials.db
                }),
                ceaFileName: null
            })
        })
    );

    actionsSubject
        .pipe(
            ofType(openDataSourceSuccess, openDataSourceError),
            take(1),
            tap((action) => {
                if (action.type !== openDataSourceSuccess.type) {
                    return;
                }

                store.dispatch(
                    login({
                        ...credentials.user
                    })
                );
            })
        )
        .subscribe();
}
