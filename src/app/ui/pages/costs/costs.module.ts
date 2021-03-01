import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsRoutingModule } from './costs-routing.module';
import { CostsComponent } from './costs.component';
import { CostsDetailComponent } from './detail/costs-detail.component';
import { CostsOverviewComponent } from './overview/costs-overview.component';
import { CostsOverviewTableComponent } from './overview/table/costs-overview-table.component';
import { CostsDetailTableComponent } from './detail/table/costs-detail-table.component';

@NgModule({
    declarations: [
        CostsComponent,
        CostsDetailComponent,
        CostsOverviewComponent,
        CostsOverviewTableComponent,
        CostsDetailTableComponent
    ],
    imports: [CommonModule, CostsRoutingModule]
})
export class CostsModule {}
