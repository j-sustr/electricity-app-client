import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxButtonGroupModule } from 'devextreme-angular/ui/button-group';
import { ViewControlBarComponent } from './view-control-bar.component';

@NgModule({
    imports: [CommonModule, DxButtonGroupModule],
    exports: [ViewControlBarComponent],
    declarations: [ViewControlBarComponent],
    providers: []
})
export class ViewControlBarModule {}
