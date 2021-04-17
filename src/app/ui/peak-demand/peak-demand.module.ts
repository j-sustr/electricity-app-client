import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeakDemandDetailChartComponent } from './detail/chart/peak-demand-detail-chart.component';
import { PeakDemandDetailComponent } from './detail/peak-demand-detail.component';
import { PeakDemandOverviewComponent } from './overview/peak-demand-overview.component';
import { PeakDemandOverviewTableComponent } from './overview/table/peak-demand-overview-table.component';
import { PeakDemandRoutingModule } from './peak-demand-routing.module';

@NgModule({
    declarations: [
        PeakDemandDetailComponent,
        PeakDemandDetailChartComponent,
        PeakDemandOverviewComponent,
        PeakDemandOverviewTableComponent
    ],
    imports: [CommonModule, PeakDemandRoutingModule]
})
export class PeakDemandModule {}
