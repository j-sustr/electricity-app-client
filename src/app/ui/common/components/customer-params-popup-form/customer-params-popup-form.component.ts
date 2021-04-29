/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app/app-store.state';
import {
    setCustomerParams,
    setIsCustomerParamsPopupFormOpen
} from 'src/app/app/costs/costs.actions';
import {
    selectCustomerParams,
    selectIsCustomerParamsPopupFormOpen
} from 'src/app/app/costs/costs.selectors';
import {
    CustomerParams,
    DS_OPERATORS,
    VOLTAGE_LEVELS
} from 'src/app/domain/costs/costs';

@Component({
    selector: 'app-customer-params-popup-form',
    templateUrl: './customer-params-popup-form.component.html',
    styleUrls: ['./customer-params-popup-form.component.scss']
})
export class CustomerParamsPopupFormComponent implements OnDestroy {
    private destroy$ = new Subject();

    // @Input()
    visible = false;

    // @Output()
    // submitted = new EventEmitter<void>();

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
            .pipe(
                select(selectIsCustomerParamsPopupFormOpen),
                takeUntil(this.destroy$),
                tap((isOpen) => {
                    this.visible = isOpen;
                })
            )
            .subscribe();

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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
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
        // this.submitted.next();
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
        this.store.dispatch(
            setIsCustomerParamsPopupFormOpen({
                open: event
            })
        );
    }
}
