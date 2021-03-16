import { HttpErrorResponse } from '@angular/common/http';

export interface Group {
    id: string;
    name: string;
}

export interface GroupsState {
    userGroups: Group[] | null;
    loading: boolean;
    error: HttpErrorResponse | null;
}
