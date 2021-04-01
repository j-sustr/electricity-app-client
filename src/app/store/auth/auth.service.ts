import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { AppState } from '../app-store.state';
import {
    getCurrentUser,
    getCurrentUserError,
    getCurrentUserSuccess
} from './auth.actions';
import { User } from './auth.model';
import { selectCurrentUser } from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {}

    getIsAuthenticated(): Observable<boolean> {
        return this.getCurrentUser().pipe(
            map((user) => typeof user === 'object')
        );
    }

    getCurrentUser(): Observable<User | null> {
        return this.store.pipe(
            select(selectCurrentUser),
            take(1),
            mergeMap((user) => {
                if (user) {
                    return of(user);
                }
                this.store.dispatch(getCurrentUser());
                return this.actionsSubject.pipe(
                    ofType(getCurrentUserSuccess, getCurrentUserError),
                    take(1),
                    mergeMap(() =>
                        this.store.pipe(select(selectCurrentUser), take(1))
                    )
                );
            })
        );
    }
}
