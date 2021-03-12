import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewControlsComponent } from './detail-view-controls.component';

describe('DetailViewControlsComponent', () => {
    let component: DetailViewControlsComponent;
    let fixture: ComponentFixture<DetailViewControlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailViewControlsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailViewControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
