import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DatetimeRangePickerModule } from '../../common/components/datetime-range-picker/datetime-range-picker.module';
import { DetailViewControlsModule } from '../../common/components/detail-view-controls/detail-view-controls.module';
import { PageTitleModule } from '../../common/components/page-title/page-title.module';
import { ViewControlBarModule } from '../../common/components/view-control-bar/view-control-bar.module';
import { CostsRoutingModule } from './costs-routing.module';
import { CustomerParamsPopupFormComponent } from './customer-params-popup-form/customer-params-popup-form.component';
import { CostsDetailComponent } from './detail/costs-detail.component';
import { CostsDetailTableComponent } from './detail/table/costs-detail-table.component';
import { CostsOverviewComponent } from './overview/costs-overview.component';
import { CostsOverviewTableComponent } from './overview/table/costs-overview-table.component';

const DX = [
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxBulletModule,
    DxPopupModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxButtonModule
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PageTitleModule,
        DatetimeRangePickerModule,
        DetailViewControlsModule,
        ViewControlBarModule,
        ...DX,
        CostsRoutingModule
    ],
    declarations: [
        CostsDetailComponent,
        CostsOverviewComponent,
        CostsOverviewTableComponent,
        CostsDetailTableComponent,
        CustomerParamsPopupFormComponent
    ]
})
export class CostsModule {}
