import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './common/component/profile/profile.component';
import { HomePageComponent } from './components/ride/home-page/home-page.component';
import { MyridesComponent } from './components/ride/myrides/myrides.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [

  {
    path: "auth", loadChildren: () => import("./components/security/security.module").then(m => m.SecurityModule)
  },
  {
    path: "ride", loadChildren: () => import("./components/ride/ride.module").then(m => m.RideModule),
  },
  { path: "myrides", component: MyridesComponent, canActivate: [AuthGuard] },
  { path: "myprofile", component: ProfileComponent ,canActivate:[AuthGuard]},
  { path: "home", redirectTo:"ride" },
  { path: "**", redirectTo: "auth", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
