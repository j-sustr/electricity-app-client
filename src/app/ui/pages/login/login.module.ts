import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';

const DX = [
    DxTemplateModule,
    DxTextBoxModule,
    DxRadioGroupModule,
    DxLoadIndicatorModule,
    DxButtonModule
];

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ...DX, LoginRoutingModule],
    declarations: [LoginFormComponent]
})
export class LoginModule {}
