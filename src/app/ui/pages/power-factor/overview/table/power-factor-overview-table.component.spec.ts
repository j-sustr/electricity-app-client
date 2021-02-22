import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PowerFactorOverviewTableComponent } from './power-factor-overview-table.component';

describe('PowerFactorOverviewTableComponent', () => {
    let component: PowerFactorOverviewTableComponent;
    let fixture: ComponentFixture<PowerFactorOverviewTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PowerFactorOverviewTableComponent]
        }).compileComponents();
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
