import { select, Selector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export const selectOnce = <T, V>(query: Selector<T, V>) => {
    return (source: Observable<T>): Observable<V> => {
        return source.pipe(select(query), take(1));
    };
};
