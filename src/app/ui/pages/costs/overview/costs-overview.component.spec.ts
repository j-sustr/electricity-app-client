import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectOverview } from 'src/app/app/costs-overview/costs-overview.selectors';
import { selectHasCustomerParams } from 'src/app/app/costs/costs.selectors';

import { CostsOverviewComponent } from './costs-overview.component';

describe('CostsOverviewComponent', () => {
    let component: CostsOverviewComponent;
    let fixture: ComponentFixture<CostsOverviewComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CostsOverviewComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectOverview, {
            items1: [],
            items2: [],
            loading: false
        });
        store.overrideSelector(selectHasCustomerParams, false);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CostsOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
