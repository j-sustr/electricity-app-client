import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/store/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.canLoad();
    }

    canLoad(): Observable<boolean> {
        return this.authService.getIsAuthenticated().pipe(
            tap((isLoggedIn) => {
                if (!isLoggedIn) {
                    void this.router.navigate(['/login']);
                }
            })
        );
    }
}
