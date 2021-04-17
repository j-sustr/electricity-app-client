import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectDistributionChart } from 'src/app/app/power-factor-detail/power-factor-distribution.selectors';
import { PowerFactorDistributionChartComponent } from './power-factor-distribution-chart.component';

describe('PowerFactorDistributionChartComponent', () => {
    let component: PowerFactorDistributionChartComponent;
    let fixture: ComponentFixture<PowerFactorDistributionChartComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PowerFactorDistributionChartComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectDistributionChart, {
            title: 'test-title',
            items: [],
            series: []
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            PowerFactorDistributionChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
