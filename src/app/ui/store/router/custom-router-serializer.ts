import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateUrl } from '../../router/router.state';

@Injectable()
export class CustomRouterSerializer
    implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        const pathComponents = [];
        while (route.firstChild) {
            route = route.firstChild;
            if (route.routeConfig?.path) {
                pathComponents.push(route.routeConfig.path);
            }
        }

        const path = '/' + pathComponents.join('/');
        const {
            url,
            root: { queryParams }
        } = routerState;
        const { params } = route;

        return { url, path, params, queryParams };
    }
}
