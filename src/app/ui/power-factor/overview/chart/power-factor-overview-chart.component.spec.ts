import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectOverviewChart } from 'src/app/app/power-factor-overview/power-factor-overview.selectors';
import { PowerFactorOverviewChartComponent } from './power-factor-overview-chart.component';

describe('PowerFactorOverviewChartComponent', () => {
    let component: PowerFactorOverviewChartComponent;
    let fixture: ComponentFixture<PowerFactorOverviewChartComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PowerFactorOverviewChartComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectOverviewChart, {
            title: 'test-title',
            items: [],
            series: []
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PowerFactorOverviewChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
