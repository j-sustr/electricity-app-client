import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerParamsPopupFormComponent } from './customer-params-popup-form.component';

describe('CustomerParamsPopupFormComponent', () => {
    let component: CustomerParamsPopupFormComponent;
    let fixture: ComponentFixture<CustomerParamsPopupFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerParamsPopupFormComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerParamsPopupFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
