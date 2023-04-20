import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/models/user';
import { LoginRequest } from 'src/app/models/security/loginrequest';
import { AccountService } from 'src/app/services/account.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordType: string = "password";
  loginRequest: LoginRequest = new LoginRequest({});
  loggedInUser !: User;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  isSuccess: boolean = false;
  toShow: boolean = false;
  responseMsg !: string;

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute,private toastService : ToasterService,private _userService : UserService) { }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginRequest = this.loginForm.value;
      this.accountService.login(this.loginRequest).subscribe(response => {
        if (response.isSuccess) {
          localStorage.setItem("token", response.data)
          this.onSuccessfulLogin(response.message);
        }
        else
          this.onUnsuccessfulLogin(response.message);
      })
    }
    else {
      this.onUnsuccessfulLogin("");
    }
  }

  showPassword() {
    this.passwordType = this.passwordType == "password" ? "text" : "password";
  }

  getControl(controlName : string,controlType : string) : boolean {
    if(controlType == 'touched')
      return this.loginForm.controls[controlName].touched;
    else if(controlType == 'invalid')
      return this.loginForm.controls[controlName].invalid;
    return false;
  }

  getErrorControl(controlName : string,controlType : string) : boolean {
    if(controlType == 'required')
      return this.loginForm.controls[controlName].errors?.required;
    else  if(controlType == 'min-length')
      return this.loginForm.controls[controlName].errors?.minlength;
    return false;
  }

  onSuccessfulLogin(msg: string) {
      this.toastService.show(msg, { classname: 'bg-success text-light', delay: 2000 });
      this._userService.getUser().subscribe(response =>{
        if(response.isSuccess)
          this.loggedInUser = response.data
          localStorage.setItem("profileUrl",this.loggedInUser.profileUrl);
          this.router.navigate(["ride"]);
      });
  }

  onUnsuccessfulLogin(msg: string) {
    this.responseMsg = msg == "" ? "Unsuccessful check data" : msg;		
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 2000 });

  }

}
