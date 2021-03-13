import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourcePickerComponent } from './data-source-picker.component';
import { DxPopupModule } from 'devextreme-angular/ui/popup';

const DX = [DxPopupModule];

@NgModule({
    imports: [CommonModule, ...DX],
    declarations: [DataSourcePickerComponent],
    exports: [DataSourcePickerComponent]
})
export class DataSourcePickerModule {}
