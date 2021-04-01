import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../../store/app-store.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

const defaultPath = '/';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.store.pipe(select(selectIsAuthenticated)).pipe(
            tap((isAuthenticated) => {
                if (isAuthenticated) {
                    void this.router.navigate([defaultPath]);
                }
            }),
            map((isAuthenticated) => !isAuthenticated)
        );
    }
}
