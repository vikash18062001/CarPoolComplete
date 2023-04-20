import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isShowDropDown: boolean = false;
  profileUrl !: string ;
  constructor(private router : Router,public _toast:ToasterService){}

  ngOnInit() {
    this.profileUrl = localStorage.getItem("profileUrl") =="" ? "../../../../assets/images/user-profile.png" : localStorage.getItem("profileUrl")!;
  }

  showDropDown()
  {
    this.isShowDropDown = !this.isShowDropDown;
  }

  logout()
  {
    this._toast.show("Successfully loggedout",{classname : "bg-danger text-light" ,delay:2000 })
    // localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
