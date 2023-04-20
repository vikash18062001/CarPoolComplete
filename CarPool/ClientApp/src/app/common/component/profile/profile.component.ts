import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CompressImageService } from 'src/app/services/image-compressor.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('inputName') inputNameRef !: ElementRef;
  constructor(
    private _userService: UserService ,
    private _toastService : ToasterService,
    private _router : Router,
    private _compressor : CompressImageService
    ) { }

  showModal : boolean = false;
  name !: string;
  email !: string;
  selectedImage !: File;
  dataUri !: string;
  userDetail !: User;
  dummyImg !: string;
  imageSrc !: string ;
  isValidPassword : boolean = false;

  ngOnInit(): void {
    this._userService.getUser().subscribe(obj => {
      if (obj.isSuccess)
      {
        this.userDetail = obj.data;
        this.name = this.userDetail.userName == '' ? 'Dummy' : this.userDetail.userName;
        this.email = this.userDetail.email;
        this.dataUri = this.userDetail.profileUrl;
      }
    })
    this.dummyImg = "../../../../assets/images/user-profile.jpg";
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      var newImg;
      console.log(file.size);
      
      this._compressor.compress(file)
      .pipe(take(1))
      .subscribe(compressedImage => {
        reader.readAsDataURL(compressedImage);
      })
      reader.onload = e => {
        this.imageSrc = reader.result as string;
        this.dataUri = reader.result as string;
      };
    }
  }

  onSave() {
    this.userDetail.profileUrl = this.dataUri;
    this.userDetail.userName = this.inputNameRef.nativeElement.value;
    this._userService.uploadImage(this.userDetail).subscribe(response => {
      if (response.isSuccess)
        this.onSuccessfullOperation(response.message);
      else 
        this.onUnSuccessfullOperation(response.message);
    });
  }

  updatePassword(password : string) {
    this.userDetail.password = password;
    this._userService.uploadImage(this.userDetail).subscribe(response =>{ 
      if(response.isSuccess)
        this._toastService.show(response.message,{classname:'bg-success text-light',delay:2000});
      else
        this._toastService.show(response.message,{classname : 'bg-danger text-light',delay:2000});
    })
  }

  onSuccessfullOperation(msg : string) {
    this._toastService.show(msg,{classname:'bg-success text-light',delay:2000});
    localStorage.setItem("profileUrl",this.userDetail.profileUrl);
    this._router.navigate(['/home']);
  }

  onUnSuccessfullOperation(msg : string) {
    this._toastService.show(msg,{classname:'bg-danger text-light',delay:2000});

  }

  closeModal() {
    this.showModal = false;
    this.isValidPassword = false;
  }

  checkPassword(password : string ) {
    this.isValidPassword = this.userDetail.password == password;
    this.isValidPassword ? this._toastService.show('Password matched',{classname : 'bg-success text-light',delay:2000}) :this._toastService.show('Incorrect password',{classname : 'bg-danger text-light',delay:2000});
  }

  displayModal() {
      this.showModal = true;
  }

  changeName() {
    console.log(this.inputNameRef);
    this.inputNameRef.nativeElement.disabled = false;
    this.inputNameRef.nativeElement.focus();
    
  }

  closeProfile() {
    this._router.navigate(["home"])
  }
}
