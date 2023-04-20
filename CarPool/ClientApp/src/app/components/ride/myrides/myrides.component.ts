import { Component } from '@angular/core';
import { Ride } from 'src/app/models/ride/ride';
import { AccountService } from 'src/app/services/account.service';
import { BookrideService } from 'src/app/services/bookride.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OfferrideService } from 'src/app/services/offerride.service';


@Component({
  selector: 'app-myrides',
  templateUrl: './myrides.component.html',
  styleUrls: ['./myrides.component.scss']
})
export class MyridesComponent {

  bookedRides: Array<Ride> = [];
  offeredRides: Array<Ride> = [];
  isBookedRequestCompleted: boolean = false;
  isOfferedRequestCompleted: boolean = false;

  constructor(private bookRideService: BookrideService, private offerRideService: OfferrideService, private accountService: AccountService, private loader: LoaderService) {
  }

  ngOnInit() {
    this.bookRideService.getBookedRides().subscribe(response => {
      response.data.forEach((element: Ride) => {
        this.accountService.getUserByEmail(element.userEmail).subscribe(user => {
          element.userName = user.data.userName;
          element.profileUrl = user.data.profileUrl;
          this.bookedRides.push(element);
          this.loader.setLoading(false);
        })
      });
      this.isBookedRequestCompleted = true;
    });

    this.offerRideService.getOfferedRides().subscribe(response => {
      response.data.forEach((element: Ride) => {
        this.accountService.getUserByEmail(element.userEmail).subscribe(user => {
          element.userName = user.data.userName;
          element.profileUrl = user.data.profileUrl;
          this.offeredRides.push(element);
          console.log(this.offeredRides);
        })
      })
      this.isOfferedRequestCompleted = true;
    });
  }
} 
