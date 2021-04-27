import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectDetail } from 'src/app/app/power-factor-detail/power-factor-detail.selectors';

import { PowerFactorDetailComponent } from './power-factor-detail.component';

describe('PowerFactorDetailComponent', () => {
    let component: PowerFactorDetailComponent;
    let fixture: ComponentFixture<PowerFactorDetailComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PowerFactorDetailComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectDetail, {
            detailType: 'distribution',
            viewType: 'chart',
            distributionStack: [],
            showEnergy: true,
            loading: false
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PowerFactorDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
