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

export async function devLogin(
    store: Store<AppState>,
    actionsSubject: ActionsSubject
): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const credentials = await import('./dev-login-credentials');

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
