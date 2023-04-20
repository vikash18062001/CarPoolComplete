import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "../ride/home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";


const routes : Routes = [
  {path:"",component:LoginComponent},
  {path:"signup",component:SignupComponent},
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class SecurityRoutingModule
{
    
}