import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthenticatedContentComponent } from './unauthenticated-content.component';
import { RouterModule } from '@angular/router';
import { SingleCardModule } from '../layouts/single-card/single-card.module';

@NgModule({
    imports: [CommonModule, SingleCardModule, RouterModule],
    declarations: [UnauthenticatedContentComponent],
    exports: [UnauthenticatedContentComponent]
})
export class UnauthenticatedContentModule {}
