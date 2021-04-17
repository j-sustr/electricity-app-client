import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeakDemandDetailComponent } from './detail/peak-demand-detail.component';
import { PeakDemandOverviewComponent } from './overview/peak-demand-overview.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'overview'
    },
    {
        path: 'overview',
        component: PeakDemandOverviewComponent
    },
    {
        path: 'detail/:groupId',
        component: PeakDemandDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeakDemandRoutingModule {}
