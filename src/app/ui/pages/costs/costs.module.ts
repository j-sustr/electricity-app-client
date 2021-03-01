import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DatetimeRangePickerModule } from '../../components/datetime-range-picker/datetime-range-picker.module';
import { PageTitleModule } from '../../components/page-title/page-title.module';
import { CostsRoutingModule } from './costs-routing.module';
import { CostsDetailComponent } from './detail/costs-detail.component';
import { CostsDetailTableComponent } from './detail/table/costs-detail-table.component';
import { CostsOverviewComponent } from './overview/costs-overview.component';
import { CostsOverviewTableComponent } from './overview/table/costs-overview-table.component';

const DX = [
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxBulletModule
];

@NgModule({
    imports: [
        CommonModule,
        PageTitleModule,
        DatetimeRangePickerModule,
        ...DX,
        CostsRoutingModule
    ],
    declarations: [
        CostsDetailComponent,
        CostsOverviewComponent,
        CostsOverviewTableComponent,
        CostsDetailTableComponent
    ]
})
export class CostsModule {}
