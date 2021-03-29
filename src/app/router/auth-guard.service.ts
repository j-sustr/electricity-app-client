import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app-store.state';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';

const defaultPath = '/';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.store.pipe(select(selectIsAuthenticated)).pipe(
            map((isAuthenticated): boolean => {
                const isAuthForm = [
                    'login-form',
                    'reset-password',
                    'create-account',
                    'change-password/:recoveryCode'
                ].includes(route?.routeConfig?.path ?? '');

                if (isAuthenticated && isAuthForm) {
                    // this.authService.lastAuthenticatedPath = defaultPath;
                    void this.router.navigate([defaultPath]);
                    return false;
                }

                if (!isAuthenticated && !isAuthForm) {
                    // this.router.navigate(['/login-form']);
                }

                // if (isAuthenticated) {
                //     this.authService.lastAuthenticatedPath =
                //         route.routeConfig.path;
                // }

                return isAuthenticated || isAuthForm;
            })
        );
    }
}
