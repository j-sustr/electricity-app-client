import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataSourcePickerModule } from '../data-source-picker/data-source-picker.module';
import { PageTitleComponent } from './page-title.component';

@NgModule({
    imports: [CommonModule, DataSourcePickerModule],
    exports: [PageTitleComponent],
    declarations: [PageTitleComponent],
    providers: []
})
export class PageTitleModule {}
