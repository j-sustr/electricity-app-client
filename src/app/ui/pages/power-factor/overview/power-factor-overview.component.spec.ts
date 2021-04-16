import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectOverview } from 'src/app/app/costs-overview/costs-overview.selectors';

import { PowerFactorOverviewComponent } from './power-factor-overview.component';

describe('PowerFactorOverviewComponent', () => {
    let component: PowerFactorOverviewComponent;
    let fixture: ComponentFixture<PowerFactorOverviewComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PowerFactorOverviewComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectOverview, {
            items1: [],
            items2: [],
            loading: false
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PowerFactorOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
