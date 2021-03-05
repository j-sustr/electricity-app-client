import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxChartModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DatetimeRangePickerModule } from '../../components/datetime-range-picker/datetime-range-picker.module';
import { PageTitleModule } from '../../components/page-title/page-title.module';
import { ViewControlBarModule } from '../../components/view-control-bar/view-control-bar.module';
import { PowerFactorDetailComponent } from './detail/power-factor-detail.component';
import { PowerFactorOverviewChartComponent } from './overview/chart/power-factor-overview-chart.component';
import { PowerFactorOverviewComponent } from './overview/power-factor-overview.component';
import { PowerFactorOverviewTableComponent } from './overview/table/power-factor-overview-table.component';
import { PowerFactorRoutingModule } from './power-factor-routing.module';
import { PowerFactorDistributionChartComponent } from './detail/distribution-chart/power-factor-distribution-chart.component';
import { PowerFactorDistributionTableComponent } from './detail/distribution-table/power-factor-distribution-table.component';

const DX = [
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxBulletModule,
    DxChartModule
];

@NgModule({
    imports: [
        CommonModule,
        PageTitleModule,
        DatetimeRangePickerModule,
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
