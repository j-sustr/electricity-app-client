import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DatetimeRangePickerModule } from '../common/components/datetime-range-picker/datetime-range-picker.module';
import { DetailViewControlsModule } from '../common/components/detail-view-controls/detail-view-controls.module';
import { PageTitleModule } from '../common/components/page-title/page-title.module';
import { ViewControlBarModule } from '../common/components/view-control-bar/view-control-bar.module';
import { PeakDemandDetailChartComponent } from './detail/chart/peak-demand-detail-chart.component';
import { PeakDemandDetailComponent } from './detail/peak-demand-detail.component';
import { PeakDemandOverviewComponent } from './overview/peak-demand-overview.component';
import { PeakDemandOverviewTableComponent } from './overview/table/peak-demand-overview-table.component';
import { PeakDemandRoutingModule } from './peak-demand-routing.module';

const DX = [
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxChartModule
];
@NgModule({
    declarations: [
        PeakDemandDetailComponent,
        PeakDemandDetailChartComponent,
        PeakDemandOverviewComponent,
        PeakDemandOverviewTableComponent
    ],
    imports: [
        CommonModule,
        PageTitleModule,
        DatetimeRangePickerModule,
        DetailViewControlsModule,
        ViewControlBarModule,
        ...DX,
        PeakDemandRoutingModule
    ]
})
export class PeakDemandModule {}
