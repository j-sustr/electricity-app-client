import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeRangeInputComponent } from './datetime-range-input.component';

describe('DatetimeRangeInputComponent', () => {
    let component: DatetimeRangeInputComponent;
    let fixture: ComponentFixture<DatetimeRangeInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatetimeRangeInputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DatetimeRangeInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
