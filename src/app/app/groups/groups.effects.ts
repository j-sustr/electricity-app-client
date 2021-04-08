import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IGroupsClient } from 'src/app/web-api-client';
import { GROUPS_CLIENT } from 'src/app/web-api-client-di';
import { getOverviewError } from '../costs-overview/costs-overview.actions';
import { createGroupInfoFromDto } from '../common/dto-mapping';
import { getUserGroupTree, getUserGroupTreeSuccess } from './groups.actions';
import { loginSuccess } from '../auth/auth.actions';

@Injectable()
export class GroupsEffects {
    getUserGroupTree$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUserGroupTree, loginSuccess),
            switchMap(() => {
                return this.client.getUserGroupInfoTree().pipe(
                    map((dto) => {
                        const tree = createGroupInfoFromDto(dto);
                        return getUserGroupTreeSuccess({
                            tree
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
