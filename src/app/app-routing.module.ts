import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppGuard } from './app/auth/guards/app.guard';
import { AuthGuard } from './app/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'costs',
        pathMatch: 'full'
    },
    {
        path: 'costs',
        loadChildren: () =>
            import('./ui/costs/costs.module').then((m) => m.CostsModule),
        canActivate: [AppGuard]
    },
    {
        path: 'power-factor',
        loadChildren: () =>
            import('./ui/power-factor/power-factor.module').then(
                (m) => m.PowerFactorModule
            ),
        canActivate: [AppGuard]
    },
    {
        path: 'peak-demand',
        loadChildren: () =>
            import('./ui/peak-demand/peak-demand.module').then(
                (m) => m.PeakDemandModule
            ),
        canActivate: [AppGuard]
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./ui/login/login.module').then((m) => m.LoginModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'costs'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules
            // enableTracing: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
