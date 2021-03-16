/* eslint-disable @typescript-eslint/unbound-method */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {
    CustomerParams,
    DS_OPERATORS,
    VOLTAGE_LEVELS
} from 'src/app/core/costs/costs';
import { AppState } from 'src/app/store/app-store.state';
import { setCustomerParams } from 'src/app/store/costs/costs.actions';
import { selectCustomerParams } from 'src/app/store/costs/costs.selectors';

@Component({
    selector: 'app-customer-params-popup-form',
    templateUrl: './customer-params-popup-form.component.html',
    styleUrls: ['./customer-params-popup-form.component.scss']
})
export class CustomerParamsPopupFormComponent {
    @Input()
    visible = false;

    @Output()
    submitted = new EventEmitter<void>();

    @Output()
    visibleChanged = new EventEmitter<boolean>();

    voltageLevelOptions = VOLTAGE_LEVELS;
    dsOperatorOptions = DS_OPERATORS;

    form = this.fb.group({
        voltageLevel: [null, [Validators.required]],
        dsOperator: [null, [Validators.required]],
        reservedPowerKW: [0, [Validators.required, Validators.min(0)]],
        yearlyReservedCapacityKW: [0, [Validators.required, Validators.min(0)]],
        monthlyReservedCapacityKW: [0, [Validators.required, Validators.min(0)]]
    });

    voltageLevelControl = this.form.get('voltageLevel');
    dsOperatorControl = this.form.get('dsOperator');
    reservedPowerControl = this.form.get('reservedPowerKW');
    yearlyReservedCapacityControl = this.form.get('yearlyReservedCapacityKW');
    monthlyReservedCapacityControl = this.form.get('monthlyReservedCapacityKW');

    constructor(private fb: FormBuilder, private store: Store<AppState>) {
        this.store
            .pipe(select(selectCustomerParams), take(1))
            .subscribe((params) => {
                if (params === null) {
                    this.form.reset();
                    return;
                }
                this.form.patchValue(params);
            });
    }

    save(): void {
        this.store.dispatch(
            setCustomerParams({ params: this.form.value as CustomerParams })
        );
    }

    submit(): void {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        this.save();
        this.submitted.next();
    }

    reset(): void {
        this.form.reset();
        this.form.clearValidators();
        this.form.clearAsyncValidators();
        this.store.dispatch(
            setCustomerParams({
                params: null
            })
        );
    }

    handleVisibleChange(event: boolean): void {
        this.visibleChanged.next(event);
    }
}
