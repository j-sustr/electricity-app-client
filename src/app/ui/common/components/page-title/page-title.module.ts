import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupPickerModule } from '../group-picker/group-picker.module';
import { PageTitleComponent } from './page-title.component';

@NgModule({
    imports: [CommonModule, GroupPickerModule],
    exports: [PageTitleComponent],
    declarations: [PageTitleComponent],
    providers: []
})
export class PageTitleModule {}
