import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-store.state';
import { selectIsAuthenticated } from 'src/app/store/auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.canLoad();
    }

    canLoad(): Observable<boolean> {
        return this.store.pipe(
            select(selectIsAuthenticated),
            take(1),
            tap((isLoggedIn) => {
                if (!isLoggedIn) {
                    void this.router.navigate(['/login']);
                }
            })
        );
    }
}
