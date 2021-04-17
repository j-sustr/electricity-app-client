import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DetailViewControlsComponent } from './detail-view-controls.component';

const DX = [DxButtonModule, DxPopupModule, DxTreeViewModule];

@NgModule({
    imports: [CommonModule, ...DX],
    exports: [DetailViewControlsComponent],
    declarations: [DetailViewControlsComponent]
})
export class DetailViewControlsModule {}
