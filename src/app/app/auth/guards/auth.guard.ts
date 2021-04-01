import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.canLoad();
    }

    canLoad(): Observable<boolean> {
        return this.authService.getIsAuthenticated().pipe(
            tap((isAuthenticated) => {
                if (isAuthenticated) {
                    void this.router.navigate(['']);
                }
            }),
            map((isAuthenticated) => !isAuthenticated)
        );
    }
}
