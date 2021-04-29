import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { CustomerParamsPopupFormComponent } from './customer-params-popup-form.component';

const DX = [
    DxLoadIndicatorModule,
    DxPopupModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxButtonModule
];

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ...DX],
    exports: [CustomerParamsPopupFormComponent],
    declarations: [CustomerParamsPopupFormComponent],
    providers: []
})
export class CustomerParamsPopupFormModule {}
