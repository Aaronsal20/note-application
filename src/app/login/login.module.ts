import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    LoginRoutingModule.components
  ]
})

export class LoginModule { }
