import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app-store.state';

@NgModule({
    imports: [CommonModule, HttpClientModule, StoreModule.forRoot(reducers)],
    exports: [StoreModule],
    providers: []
})
export class AppStoreModule {}
