import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { SingleCardModule } from '../common/layouts/single-card/single-card.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

const DX = [
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxTextBoxModule,
    DxRadioGroupModule,
    DxSelectBoxModule,
    DxButtonModule
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ...DX,
        SingleCardModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent, LoginFormComponent]
})
export class LoginModule {}
