import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular';
import { LoginRoutingModule } from './login-routing.module';

const DX = [
    DxFormModule,
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxButtonModule
];

@NgModule({
    imports: [CommonModule, ...DX, LoginRoutingModule],
    declarations: [LoginComponent, LoginFormComponent]
})
export class LoginModule {}
