import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SecurityModule } from './components/security/security.module';
import { RideModule } from './components/ride/ride.module';
import { AppinterceptorService } from './services/appinterceptor.service';
import { JwtHelperService ,JWT_OPTIONS} from '@auth0/angular-jwt';
import { NgbModule, NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponentModule } from './common/common-component.module';
import { ToastsContainer } from './common/toaster';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SecurityModule,
    RideModule,
    NgbModule,
    CommonComponentModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppinterceptorService, multi: true }
    , { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],

  bootstrap: [AppComponent]
})
export class AppModule { }
