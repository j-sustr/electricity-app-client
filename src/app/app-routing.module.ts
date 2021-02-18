import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'power-factor',
        loadChildren: () =>
            import('./ui/pages/power-factor/power-factor.module').then(
                (m) => m.PowerFactorModule
            )
    },
    {
        path: '**',
        redirectTo: 'costs'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
