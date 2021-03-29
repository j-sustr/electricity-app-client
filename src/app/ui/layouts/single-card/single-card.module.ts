import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { SingleCardComponent } from './single-card.component';

@NgModule({
    imports: [CommonModule, DxScrollViewModule],
    exports: [SingleCardComponent],
    declarations: [SingleCardComponent]
})
export class SingleCardModule {}
