import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppBarComponent } from './app-bar.component';

const CDK = [OverlayModule];

@NgModule({
    imports: [CommonModule, ...CDK, RouterModule],
    exports: [AppBarComponent],
    declarations: [AppBarComponent],
    providers: []
})
export class AppBarModule {}
