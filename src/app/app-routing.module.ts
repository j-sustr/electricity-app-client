import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'costs',
        pathMatch: 'full'
    },
    {
        path: 'costs',
        loadChildren: () =>
            import('./ui/pages/costs/costs.module').then((m) => m.CostsModule)
    },
    {
        path: 'power-factor',
        loadChildren: () =>
            import('./ui/pages/power-factor/power-factor.module').then(
                (m) => m.PowerFactorModule
            )
    },
    {
        path: 'login-form',
        loadChildren: () =>
            import('./ui/pages/login/login.module').then((m) => m.LoginModule)
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
