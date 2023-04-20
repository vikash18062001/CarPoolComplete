import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideRoutingModule } from './ride-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MyridesComponent } from './myrides/myrides.component';
import { CommonComponentModule } from 'src/app/common/common-component.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookrideComponent } from './bookoroffer/bookride.component';
import { DatePipe } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    BookrideComponent,
    HomePageComponent,
    MyridesComponent,

  ],
  imports: [
    CommonModule,
    RideRoutingModule,
    CommonComponentModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule

  ],
  providers: [DatePipe]
})
export class RideModule { }
