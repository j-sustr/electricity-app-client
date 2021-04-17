import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PowerFactorDetailComponent } from './detail/power-factor-detail.component';
import { PowerFactorOverviewComponent } from './overview/power-factor-overview.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'overview'
    },
    {
        path: 'overview',
        component: PowerFactorOverviewComponent
    },
    {
        path: 'detail/:groupId',
        component: PowerFactorDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PowerFactorRoutingModule {}
