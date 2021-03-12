import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IGroupsClient } from 'src/app/web-api-client';
import { GROUPS_CLIENT } from 'src/app/web-api-client-di';
import { getOverviewError } from '../costs-overview/costs-overview.actions';
import { getUserGroups, getUserGroupsSuccess } from './groups.actions';
import { Group } from './groups.model';

@Injectable()
export class GroupsEffects {
    getUserGroups$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUserGroups),
            switchMap(() => {
                return this.client.getUserGroups().pipe(
                    map((dto) => {
                        const userGroups = dto.groups?.map((g) => {
                            return {
                                id: g.id ?? '(no id)',
                                name: g.id ?? '(no name)'
                            } as Group;
                        });

                        if (!Array.isArray(userGroups)) {
                            throw new Error('no user groups');
                        }

                        return getUserGroupsSuccess({
                            userGroups
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            getOverviewError({
                                error
                            })
                        )
                    )
                );
            })
        );
    });

    constructor(
        private actions$: Actions,
        @Inject(GROUPS_CLIENT)
        private client: IGroupsClient
    ) {}
}
