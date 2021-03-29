import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxFormModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';

const DX = [
    DxFormModule,
    DxTemplateModule,
    DxLoadIndicatorModule,
    DxButtonModule
];

@NgModule({
    imports: [CommonModule, ...DX, LoginRoutingModule],
    declarations: [LoginFormComponent]
})
export class LoginModule {}
