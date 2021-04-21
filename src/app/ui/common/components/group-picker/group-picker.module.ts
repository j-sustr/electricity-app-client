import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { GroupPickerComponent } from './group-picker.component';

const DX = [DxPopupModule, DxTreeViewModule];

@NgModule({
    declarations: [GroupPickerComponent],
    imports: [CommonModule, ...DX],
    exports: [GroupPickerComponent]
})
export class GroupPickerModule {}
