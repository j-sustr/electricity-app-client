import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsRoutingModule } from './costs-routing.module';
import { CostsComponent } from './costs.component';
import { CostsDetailComponent } from './detail/costs-detail.component';
import { CostsOverviewComponent } from './overview/costs-overview.component';

@NgModule({
    declarations: [
        CostsComponent,
        CostsDetailComponent,
        CostsOverviewComponent
    ],
    imports: [CommonModule, CostsRoutingModule]
})
export class CostsModule {}
