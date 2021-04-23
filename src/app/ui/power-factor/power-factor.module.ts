import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DatetimeRangePickerModule } from '../common/components/datetime-range-picker/datetime-range-picker.module';
import { DetailViewControlsModule } from '../common/components/detail-view-controls/detail-view-controls.module';
import { PageTitleModule } from '../common/components/page-title/page-title.module';
import { ViewControlBarModule } from '../common/components/view-control-bar/view-control-bar.module';
import { PowerFactorDistributionChartComponent } from './detail/distribution-chart/power-factor-distribution-chart.component';
import { PowerFactorDistributionTableComponent } from './detail/distribution-table/power-factor-distribution-table.component';
import { PowerFactorDetailComponent } from './detail/power-factor-detail.component';
import { PowerFactorOverviewChartComponent } from './overview/chart/power-factor-overview-chart.component';
import { PowerFactorOverviewComponent } from './overview/power-factor-overview.component';
import { PowerFactorOverviewTableComponent } from './overview/table/power-factor-overview-table.component';
import { PowerFactorRoutingModule } from './power-factor-routing.module';

const DX = [
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxBulletModule,
    DxChartModule,
    DxButtonModule
];

@NgModule({
    imports: [
        CommonModule,
        PageTitleModule,
        DatetimeRangePickerModule,
        DetailViewControlsModule,
        ViewControlBarModule,
        ...DX,
        PowerFactorRoutingModule
    ],
    exports: [],
    declarations: [
        PowerFactorDetailComponent,
        PowerFactorOverviewComponent,
        PowerFactorOverviewTableComponent,
        PowerFactorOverviewChartComponent,
        PowerFactorDistributionChartComponent,
        PowerFactorDistributionTableComponent
    ],
    providers: []
})
export class PowerFactorModule {}
