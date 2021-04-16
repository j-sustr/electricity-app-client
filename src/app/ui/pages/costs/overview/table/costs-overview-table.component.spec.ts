import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectOverviewTable } from 'src/app/app/costs-overview/costs-overview.selectors';

import { CostsOverviewTableComponent } from './costs-overview-table.component';

describe('CostsOverviewTableComponent', () => {
    let component: CostsOverviewTableComponent;
    let fixture: ComponentFixture<CostsOverviewTableComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CostsOverviewTableComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectOverviewTable, {
            items: []
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CostsOverviewTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
