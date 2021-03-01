import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsRoutingModule } from './costs-routing.module';
import { CostsDetailComponent } from './detail/costs-detail.component';
import { CostsOverviewComponent } from './overview/costs-overview.component';
import { CostsOverviewTableComponent } from './overview/table/costs-overview-table.component';
import { CostsDetailTableComponent } from './detail/table/costs-detail-table.component';
import {
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxBulletModule
} from 'devextreme-angular';
import { DatetimeRangePickerModule } from '../../components/datetime-range-picker/datetime-range-picker.module';
import { PageTitleModule } from '../../components/page-title/page-title.module';

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
