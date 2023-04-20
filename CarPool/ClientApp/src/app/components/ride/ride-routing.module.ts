import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/services/auth-guard.service';
import { BookrideComponent } from './bookoroffer/bookride.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyridesComponent } from './myrides/myrides.component';


const routes: Routes = [
  { path: "", component: HomePageComponent, canActivate: [AuthGuard] },
  { path: ":rideMode", component: BookrideComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RideRoutingModule { }
