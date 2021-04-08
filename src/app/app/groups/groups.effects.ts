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

@Injectable()
export class GroupsEffects {
    getUserGroupInfoTree$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUserGroupTree),
            switchMap(() => {
                return this.client.getUserGroupInfoTree().pipe(
                    map((dto) => {
                        const root = createGroupInfoFromDto(dto);
                        return getUserGroupTreeSuccess({
                            root
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
