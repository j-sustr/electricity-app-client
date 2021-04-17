import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectIntervals } from 'src/app/app/data-source/data-source.selectors';
import { selectOverviewTable } from 'src/app/app/power-factor-overview/power-factor-overview.selectors';
import { PowerFactorOverviewTableComponent } from './power-factor-overview-table.component';

describe('PowerFactorOverviewTableComponent', () => {
    let component: PowerFactorOverviewTableComponent;
    let fixture: ComponentFixture<PowerFactorOverviewTableComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PowerFactorOverviewTableComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectOverviewTable, {
            items: []
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PowerFactorOverviewTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
