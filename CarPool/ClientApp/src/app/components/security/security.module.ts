import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SecurityRoutingModule } from './security-routing.module';
import { CommonComponentModule } from 'src/app/common/common-component.module';
import { HomePageComponent } from '../ride/home-page/home-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
    CommonComponentModule
  ]
})
export class SecurityModule { }
