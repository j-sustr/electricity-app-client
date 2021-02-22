import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    DxBulletModule,
    DxDataGridModule,
    DxTemplateModule
} from 'devextreme-angular';
import { DatetimeRangePickerModule } from '../../components/datetime-range-picker/datetime-range-picker.module';
import { PowerFactorDetailComponent } from './detail/power-factor-detail.component';
import { PowerFactorOverviewComponent } from './overview/power-factor-overview.component';
import { PowerFactorRoutingModule } from './power-factor-routing.module';
import { PowerFactorOverviewTableComponent } from './overview/table/power-factor-overview-table.component';
import { PowerFactorOverviewChartComponent } from './overview/table/power-factor-overview-chart.component';

const DX = [DxDataGridModule, DxTemplateModule, DxBulletModule];

@NgModule({
    imports: [
        CommonModule,
        DatetimeRangePickerModule,
        PowerFactorRoutingModule,
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
