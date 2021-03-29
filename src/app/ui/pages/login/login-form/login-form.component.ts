import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-store.state';
import { login } from 'src/app/store/auth/auth.actions';

interface FormData {
    email?: string;
    password?: string;
}

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    loading = false;
    formData: FormData = {};

    constructor(
        private store: Store<AppState>,
        private router: Router // private notificationsService: NotificationService
    ) {}

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
