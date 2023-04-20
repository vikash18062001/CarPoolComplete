import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utility } from 'src/app/utility/Utility';
import { SignUpRequest } from 'src/app/models/security/signuprequest';
import { AccountService } from 'src/app/services/account.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  passwordType: string = "password";
  signUpForm: FormGroup;
  password: string = '';
  confirmPassword: string = '';
  signUpRequest: SignUpRequest = new SignUpRequest({});
  allUsers: Array<Object> = [];
  isSuccess: boolean = false;
  toShow: boolean = false;
  responseMsg !: string;

  constructor(private accountService: AccountService, private router: Router, private toasterService: ToasterService) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.signUpForm.addValidators(Utility.confirmPasswordValidator(this.signUpForm));
  }

  showPassword(ref: HTMLInputElement) {
    ref.type = ref.type == 'password' ? 'text' : 'password';
  }

  onSubmit() {

    if (this.signUpForm.valid) {
      this.signUpRequest = this.signUpForm.value;
      this.accountService.signUpUser(this.signUpRequest).subscribe(response => {
        if (response.isSuccess)
          this.onSuccessfulSignUp(response.message);
        else
          this.onUnsuccessfulSignUp(response.message);
      });
    }
    else {
      this.onUnsuccessfulSignUp("Check the fields");
    }

  }

  getControl(controlName : string,controlType : string) : boolean {
    if(controlType == 'touched')
      return this.signUpForm.controls[controlName].touched;
    else if(controlType == 'invalid')
    return this.signUpForm.controls[controlName].invalid;
    return false;
  }

  getErrorControl(controlName : string,controlType : string) : boolean {
    if(controlType == 'required')
      return this.signUpForm.controls[controlName].errors?.required;
    else  if(controlType == 'min-length')
      return this.signUpForm.controls[controlName].errors?.minlength;
    return false;
  }

  onSuccessfulSignUp(msg: string) {
    this.toasterService.show(msg, { classname: 'bg-success text-light', delay: 2000 })
    this.router.navigate(["login"]);
  }

  onUnsuccessfulSignUp(msg: string) {
    this.responseMsg = msg == "" ? "Unsuccesful check data" : msg;
    this.toasterService.show(msg, { classname: 'bg-danger text-light', delay: 2000 })
  }

}
