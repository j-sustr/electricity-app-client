import { HttpErrorResponse } from '@angular/common/http';

export interface ArchiveInfo {
    arch: number;
    count: number;
    range: Interval | null;
    intervals: Interval[] | null;
}

export interface GroupInfo {
    id: string;
    name: string;
    archives: ArchiveInfo[] | null;
    subgroups: GroupInfo[] | null;
}

export interface GroupsState {
    userGroupTree: GroupInfo | null;
    loading: boolean;
    error: HttpErrorResponse | null;
}
