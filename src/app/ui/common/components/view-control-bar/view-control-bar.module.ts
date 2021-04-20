import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxButtonGroupModule } from 'devextreme-angular/ui/button-group';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { ViewControlBarComponent } from './view-control-bar.component';
import { AggregationInputComponent } from './aggregation-input/aggregation-input.component';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';

const CDK = [OverlayModule];
const DX = [
    DxButtonModule,
    DxButtonGroupModule,
    DxCheckBoxModule,
    DxSelectBoxModule
];

@NgModule({
    imports: [CommonModule, ...CDK, ...DX],
    exports: [ViewControlBarComponent],
    declarations: [ViewControlBarComponent, AggregationInputComponent],
    providers: []
})
export class ViewControlBarModule {}
