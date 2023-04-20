import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentRoutingModule } from './common-component-routing.module';
import { UsercardComponent } from './component/usercard/usercard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { AutosuggestionComponent } from './component/autosuggestion/autosuggestion.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ProfileComponent } from './component/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from './directives/control-directive';
import { ToastsContainer } from './toaster';
import { ModalComponent } from './component/changepasswordmodal/modal.component';

@NgModule({
  declarations: [
    UsercardComponent,
    NavbarComponent,
    SpinnerComponent,
    AutosuggestionComponent,
    ProfileComponent,
    ModalComponent,
    ToastsContainer,
    DisableControlDirective,
  ],
  imports: [
    CommonModule,
    CommonComponentRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    NgbModule,
    NgbToastModule,
    ReactiveFormsModule,
  ],
  exports: [
    UsercardComponent,
    NavbarComponent,
    SpinnerComponent,
    AutosuggestionComponent,
    ProfileComponent,
    ModalComponent,
    ToastsContainer,
    DisableControlDirective,
  ],
})
export class CommonComponentModule { }
