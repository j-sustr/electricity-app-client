import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { AppBarComponent } from './app-bar.component';

const DX = [DxButtonModule];
const CDK = [OverlayModule];

@NgModule({
    imports: [CommonModule, ...DX, ...CDK, RouterModule],
    exports: [AppBarComponent],
    declarations: [AppBarComponent],
    providers: []
})
export class AppBarModule {}
