import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsDetailComponent } from './detail/costs-detail.component';
import { CostsOverviewComponent } from './overview/costs-overview.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'overview'
    },
    {
        path: 'overview',
        component: CostsOverviewComponent
    },
    {
        path: 'detail',
        component: CostsDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CostsRoutingModule {}
