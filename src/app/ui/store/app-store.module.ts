import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { dataSourceReducer, DataSourceState } from './app/app.reducer';

export interface ApplicationState {
    dataSource: DataSourceState;
}

const reducers: ActionReducerMap<ApplicationState> = {
    dataSource: dataSourceReducer
};

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('appStore', reducers)
    ],
    exports: [StoreModule],
    providers: []
})
export class AppStoreModule {}
