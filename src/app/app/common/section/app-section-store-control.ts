import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppState } from '../../app-store.state';
import { selectRouterPath } from '../router/router.selectors';
import {
    isSectionPath,
    mapSectionPathToGetDataAction,
    mapSectionPathToHasDataSelector,
    SectionPath
} from '../router/section-path-utils';

@Injectable({
    providedIn: 'root'
})
export class AppSectionStoreControl {
    sectionPath$: Observable<SectionPath>;

    constructor(private store: Store<AppState>) {
        this.sectionPath$ = this.store.pipe(
            select(selectRouterPath),
            filter((routerPath) => {
                return isSectionPath(routerPath);
            })
        );
    }

    hasData(): Promise<boolean> {
        return this.sectionPath$
            .pipe(
                switchMap((path) => {
                    const selector = mapSectionPathToHasDataSelector(path);
                    return this.store.pipe(select(selector), take(1));
                })
            )
            .toPromise();
    }

    dispatchGetData(): Promise<void> {
        return this.sectionPath$
            .pipe(
                map((path) => {
                    const action = mapSectionPathToGetDataAction(path);
                    this.store.dispatch(action);
                })
            )
            .toPromise();
    }
}
