import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPickerComponent } from './group-picker.component';

describe('GroupPickerComponent', () => {
    let component: GroupPickerComponent;
    let fixture: ComponentFixture<GroupPickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupPickerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
