/* eslint-disable @typescript-eslint/unbound-method */
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-store.state';
import { login } from 'src/app/store/auth/auth.actions';
import { openDataSource } from 'src/app/store/data-source/data-source.actions';
import {
    DataSourceType,
    DBConnectionParams,
    TenantDto
} from 'src/app/web-api-client';

interface FormData {
    email?: string;
    password?: string;
}

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements AfterViewInit {
    dataSourceTypes = Object.freeze(['Database', 'CEA File']) as string[];

    loading = false;
    formData: FormData = {};

    form = this.fb.group({
        dataSourceType: [null, [Validators.required]],
        dbConnectionParams: this.fb.group({
            server: [null, Validators.required],
            dbName: [null, Validators.required],
            username: [null, Validators.required],
            password: [null, Validators.required]
        }),
        ceaFilename: [null, [Validators.required]],
        server: [null, [Validators.required]],
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

    constructor(private store: Store<AppState>, private fb: FormBuilder) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.dataSourceTypeControl?.setValue('Database');
        }, 0);
    }

    open(): void {
        this.store.dispatch(
            openDataSource({
                tenant: new TenantDto({
                    dataSourceType: this.form.get('dataSourceType')
                        ?.value as DataSourceType,
                    dbConnectionParams: this.form.get('dbConnectionParams')
                        ?.value as DBConnectionParams,
                    ceaFileName: this.form.get('ceaFilename')?.value as string
                })
            })
        );

        login({
            username: this.form.get('username')?.value as string,
            password: this.form.get('password')?.value as string
        });
    }

    submit(): void {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        this.open();
    }

    onSubmit(e: Event): void {
        e.preventDefault();
        const { email, password } = this.formData;
        this.loading = true;

        this.store.dispatch(
            login({
                username: email ?? '',
                password: password ?? ''
            })
        );

        // if (!result.isOk) {
        //     this.loading = false;
        //     notify(result.message, 'error', 2000);
        // }
    }
}
