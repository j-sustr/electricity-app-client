import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { GroupInfo } from './groups.model';

export const getUserGroupTree = createAction('[Groups] Get User Group Tree');

export const getUserGroupTreeSuccess = createAction(
    '[Groups] Get User Group Tree Success',
    props<{ tree: GroupInfo }>()
);

export const getUserGroupTreeError = createAction(
    '[Groups] Get User Group Tree Error',
    props<{ error: HttpErrorResponse }>()
);
