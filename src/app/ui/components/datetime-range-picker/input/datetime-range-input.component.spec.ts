import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Type, ViewChild } from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    flush,
    flushMicrotasks,
    inject,
    TestBed
} from '@angular/core/testing';
import { DatetimeRangePickerModule } from '../datetime-range-picker.module';
import { DatetimeRangePickerComponent } from '../picker/datetime-range-picker.component';
import { DatetimeRangeInputComponent } from './datetime-range-input.component';

describe('DatetimeRangeInputComponent', () => {
    function createComponent<T>(
        component: Type<T>,
        declarations: Type<unknown>[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [DatetimeRangePickerModule],
            declarations: [component, ...declarations]
        });

        return TestBed.createComponent(component);
    }

    afterEach(inject([OverlayContainer], (container: OverlayContainer) => {
        container.ngOnDestroy();
    }));

    it('should set month throught the picker', fakeAsync(() => {
        const fixture = createComponent(StandardDatetimeRangePickerComponent);
        fixture.detectChanges();

        fixture.componentInstance.rangeInput.open();
        fixture.detectChanges();

        let btn = document.querySelector<HTMLElement>(
            '.datetime-range-picker-content .dx-button:nth-child(1)'
        );
        expect(btn?.innerText).toBe('Year');
        btn?.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        btn = document.querySelector<HTMLElement>(
            '.dx-calendar-cell:nth-child(1)'
        );
        expect(btn?.innerText).toBe('2019');
        btn?.dispatchEvent(new Event('click'));
        flushMicrotasks();
        flush();
        fixture.detectChanges();

        const label = (fixture.nativeElement as HTMLElement).querySelector(
            'app-datetime-range-input .value-label'
        );

        expect(label?.innerHTML).toBe('2019');
    }));

    it('should disable out of range values', () => {});
});

@Component({
    template: `
        <app-datetime-range-input
            [min]="minDate"
            [max]="maxDate"
            [rangePicker]="rangePicker"
        >
        </app-datetime-range-input>

        <app-datetime-range-picker #rangePicker></app-datetime-range-picker>
    `
})
class StandardDatetimeRangePickerComponent {
    @ViewChild(DatetimeRangeInputComponent)
    rangeInput!: DatetimeRangeInputComponent;
    @ViewChild(DatetimeRangePickerComponent)
    rangePicker!: DatetimeRangePickerComponent;

    minDate: Date | null = null;
    maxDate: Date | null = null;
}
