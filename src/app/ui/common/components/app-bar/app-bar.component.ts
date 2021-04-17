import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app/app-store.state';
import { logout } from 'src/app/app/auth/auth.actions';
import { User } from 'src/app/app/auth/auth.model';
import { selectCurrentUser } from 'src/app/app/auth/auth.selectors';

type NavItem = {
    label: string;
    link: string;
    icon?: string;
};

@Component({
    selector: 'app-bar',
    templateUrl: 'app-bar.component.html',
    styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {
    items: NavItem[] = [
        {
            label: 'Costs',
            link: 'costs',
            icon: 'dx-icon-money'
        },
        {
            label: 'Power Factor',
            link: 'power-factor'
        },
        {
            label: 'Peak Demand',
            link: 'peak-demand'
        }
    ];

    isUserMenuOpen = false;

    currentUser$: Observable<User | null>;

    constructor(private store: Store<AppState>) {
        this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    }

    handleLogoutClick(): void {
        this.store.dispatch(logout());
    }

    handleUserMenuOutsideClick(): void {
        this.isUserMenuOpen = false;
    }
}
