import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Group } from './groups.model';

export const getUserGroups = createAction('[Groups] Get User Groups');

export const getUserGroupsSuccess = createAction(
    '[Groups] Get User Groups Success',
    props<{ userGroups: Group[] }>()
);

export const getUserGroupsError = createAction(
    '[Groups] Get User Groups Error',
    props<{ error: HttpErrorResponse }>()
);
