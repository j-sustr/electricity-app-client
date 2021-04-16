import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectCustomerParams } from 'src/app/app/costs/costs.selectors';
import { CustomerParamsPopupFormComponent } from './customer-params-popup-form.component';

describe('CustomerParamsPopupFormComponent', () => {
    let component: CustomerParamsPopupFormComponent;
    let fixture: ComponentFixture<CustomerParamsPopupFormComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [CustomerParamsPopupFormComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectCustomerParams, null);
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
