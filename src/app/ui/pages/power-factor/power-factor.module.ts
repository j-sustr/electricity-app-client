import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DatetimeRangePickerModule } from '../../components/datetime-range-picker/datetime-range-picker.module';
import { PageTitleModule } from '../../components/page-title/page-title.module';
import { PowerFactorDetailComponent } from './detail/power-factor-detail.component';
import { PowerFactorOverviewChartComponent } from './overview/chart/power-factor-overview-chart.component';
import { PowerFactorOverviewComponent } from './overview/power-factor-overview.component';
import { PowerFactorOverviewTableComponent } from './overview/table/power-factor-overview-table.component';
import { PowerFactorRoutingModule } from './power-factor-routing.module';

const DX = [DxDataGridModule, DxTemplateModule, DxBulletModule];

@NgModule({
    imports: [
        CommonModule,
        DatetimeRangePickerModule,
        PowerFactorRoutingModule,
        PageTitleModule,
        ...DX
    ],
    exports: [],
    declarations: [
        PowerFactorDetailComponent,
        PowerFactorOverviewComponent,
        PowerFactorOverviewTableComponent,
        PowerFactorOverviewChartComponent
    ],
    providers: []
})
export class PowerFactorModule {}
