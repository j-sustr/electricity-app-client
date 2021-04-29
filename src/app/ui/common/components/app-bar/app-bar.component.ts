import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app/app-store.state';
import { logout } from 'src/app/app/auth/auth.actions';
import { selectCurrentUser } from 'src/app/app/auth/auth.selectors';
import { setIsCustomerParamsPopupFormOpen } from 'src/app/app/costs/costs.actions';
import { selectDataSourceName } from 'src/app/app/data-source/data-source.selectors';

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

    userBtnText$: Observable<string | null>;

    constructor(private store: Store<AppState>) {
        const currentUser$ = this.store.pipe(select(selectCurrentUser));
        const dataSourceName$ = this.store.pipe(select(selectDataSourceName));
        this.userBtnText$ = combineLatest([currentUser$, dataSourceName$]).pipe(
            map(([user, dsName]) => {
                if (user && dsName) {
                    return user.username + ', ' + dsName;
                }
                return null;
            })
        );
    }

    handleLogoutBtnClick(): void {
        this.store.dispatch(logout());
    }

    handleCustomerParamsBtnClick(): void {
        this.store.dispatch(
            setIsCustomerParamsPopupFormOpen({
                open: true
            })
        );
    }

    handleUserMenuOutsideClick(): void {
        this.isUserMenuOpen = false;
    }
}
