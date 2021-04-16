import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DataSourcePickerComponent } from './data-source-picker.component';

describe('DataSourcePickerComponent', () => {
    let component: DataSourcePickerComponent;
    let fixture: ComponentFixture<DataSourcePickerComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DataSourcePickerComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DataSourcePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
