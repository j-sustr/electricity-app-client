import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectDistributionTable } from 'src/app/app/power-factor-detail/power-factor-distribution.selectors';

import { PowerFactorDistributionTableComponent } from './power-factor-distribution-table.component';

describe('PowerFactorDistributionTableComponent', () => {
    let component: PowerFactorDistributionTableComponent;
    let fixture: ComponentFixture<PowerFactorDistributionTableComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PowerFactorDistributionTableComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectDistributionTable, {
            items: [],
            phases: {
                main: true,
                l1: false,
                l2: false,
                l3: false
            }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            PowerFactorDistributionTableComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
