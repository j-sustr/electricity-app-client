import { Params } from '@angular/router';

export interface RouterStateUrl {
    url: string;
    path: string;
    params: Params;
    queryParams: Params;
}
