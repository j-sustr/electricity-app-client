import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SingleCardComponent } from './single-card.component';

@NgModule({
    imports: [CommonModule],
    exports: [SingleCardComponent],
    declarations: [SingleCardComponent]
})
export class SingleCardModule {}
