/* eslint-disable @typescript-eslint/unbound-method */
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app/app-store.state';
import { login } from 'src/app/app/auth/auth.actions';
import {
    openDataSource,
    openDataSourceError,
    openDataSourceSuccess
} from 'src/app/app/data-source/data-source.actions';
import { selectIsLoading } from 'src/app/app/data-source/data-source.selectors';
import { conditionalValidator } from 'src/app/ui/common/validators/conditionalValidator';
import {
    DataSourceType,
    DBConnectionParams,
    TenantDto
} from 'src/app/web-api-client';

const DATABASE = 'Database';
const CEA_FILE = 'CEA File';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements AfterViewInit, OnDestroy {
    readonly dataSourceTypes = [DATABASE, CEA_FILE] as const;

    destroy$ = new Subject();

    loading$: Observable<boolean>;

    ceaFiles$: Observable<string[]>;

    dbConnectionParamValidator = conditionalValidator(() => {
        return this.dataSourceTypeControl?.value === DATABASE;
    }, Validators.required);

    ceaFilenameValidator = conditionalValidator(() => {
        return this.dataSourceTypeControl?.value === CEA_FILE;
    }, Validators.required);

    form = this.fb.group({
        dataSourceType: [null, [Validators.required]],
        dbConnectionParams: this.fb.group({
            server: [null, this.dbConnectionParamValidator],
            dbName: [null, this.dbConnectionParamValidator],
            username: [null, Validators.required],
            password: [null, Validators.required]
        }),
        ceaFilename: [null, [this.ceaFilenameValidator]],
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
    });

    dataSourceTypeControl = this.form.get('dataSourceType');
    dbConnectionServerControl = this.form.get('dbConnectionParams.server');
    dbConnectionDBNameControl = this.form.get('dbConnectionParams.dbName');
    dbConnectionUsernameControl = this.form.get('dbConnectionParams.username');
    dbConnectionPasswordControl = this.form.get('dbConnectionParams.password');
    ceaFilenameControl = this.form.get('ceaFilename');
    serverControl = this.form.get('server');
    usernameControl = this.form.get('username');
    passwordControl = this.form.get('password');

    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.loading$ = this.store.pipe(select(selectIsLoading));
        this.loading$
            .pipe(
                takeUntil(this.destroy$),
                tap((loading) => {
                    if (loading) {
                        this.form.disable();
                        return;
                    }
                    this.form.enable();
                })
            )
            .subscribe();

        this.ceaFiles$ = of(['not implemented']);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.dataSourceTypeControl?.setValue(DATABASE);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (window as any).dsForm = this.form;
        }, 0);

        this.form.get('dataSourceType')?.valueChanges.subscribe((value) => {
            if (value === DATABASE) {
                this.form.get('dbConnectionParams')?.updateValueAndValidity();
            } else if (value === CEA_FILE) {
                this.ceaFilenameControl?.updateValueAndValidity();
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    uploadNewFile(): void {
        throw new Error('not implemented');
    }

    open(): void {
        const dsType = this.dataSourceTypes.indexOf(
            this.form.get('dataSourceType')?.value
        ) as DataSourceType;

        const dbConnectionParams =
            dsType === DataSourceType.DB
                ? new DBConnectionParams(
                      this.form.get('dbConnectionParams')?.value
                  )
                : null;

        this.store.dispatch(
            openDataSource({
                tenant: new TenantDto({
                    dataSourceType: dsType,
                    dbConnectionParams,
                    ceaFileName: this.form.get('ceaFilename')?.value as string
                })
            })
        );

        this.actionsSubject
            .pipe(
                ofType(openDataSourceSuccess, openDataSourceError),
                take(1),
                tap((action) => {
                    if (action.type !== openDataSourceSuccess.type) {
                        return;
                    }

                    const username = this.form.get('username')?.value as string;
                    const password = this.form.get('password')?.value as string;

                    this.store.dispatch(
                        login({
                            username,
                            password
                        })
                    );
                })
            )
            .subscribe();
    }

    submit(): void {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        this.open();
    }
}
