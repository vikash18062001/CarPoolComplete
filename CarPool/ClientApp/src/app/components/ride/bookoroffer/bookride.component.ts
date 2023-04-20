import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { Ride } from 'src/app/models/ride/ride';
import { BookrideService } from 'src/app/services/bookride.service';
import { OfferrideService } from 'src/app/services/offerride.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Utility } from 'src/app/utility/Utility';

@Component({
  selector: 'app-bookride',
  templateUrl: './bookride.component.html',
  styleUrls: ['./bookride.component.scss']
})
export class BookrideComponent {

  timeSlots: Array<string>;
  bookRideForm: FormGroup;
  rideDetails: Ride = new Ride();
  matchedRide: Array<Ride> = [];
  cardHeading !: string;
  rideMode !: string | null;
  isNextCard: boolean = false;
  additionalRideInfo: FormGroup;
  responseMsg !: string;
  currentTime: string | null;
  isOfferCard: boolean = false;
  showLoader: boolean = false;
  price: number = 0;

  constructor(private bookrideService: BookrideService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private offerRideService: OfferrideService, private datePipe: DatePipe, private toastService: ToasterService) {
    this.timeSlots = Constants.timeSlots;
    this.currentTime = this.datePipe.transform((new Date), "yyyy-MM-dd");
    this.bookRideForm = new FormGroup({
      From: new FormControl('', [Validators.required]),
      To: new FormControl('', [Validators.required]),
      Date: new FormControl('', [Validators.required]),
      Seat: new FormControl(1)
    })
    this.additionalRideInfo = this.fb.group({ stops: this.fb.array([this.fb.control('')]) });

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.rideMode = params.get('rideMode');
    });
    this.cardHeading = this.rideMode == "book" ? "Book a ride" : "Offer a ride";
    this.isOfferCard = this.rideMode != "book";
  }

  getControl(controlName: string, controlType: string) {
    if (controlType == 'touched')
      return this.bookRideForm.controls[controlName].touched;
    else if (controlType == 'invalid')
      return this.bookRideForm.controls[controlName].invalid;
    else if (controlType == 'value')
      return this.bookRideForm.controls[controlName].value;
    return false;
  }

  onSubmitForBooking() {
    this.showLoader = false;
    if (this.bookRideForm.valid && this.rideDetails.startTime != "") {
      if (!this.checkSrcDst()) {
        this.initializeRideDetail();
        this.bookrideService.getMatchesForRide(this.rideDetails).subscribe(response => {
          this.matchedRide = [];
          response.data.forEach((element: Ride) => {
            this.matchedRide.push(element);
          });
          this.showLoader = true;
        })
      }
    } else {
      this.onUnsuccessfulOperation("Fill the required fields");
    }
  }

  onSubmitForOffering() {
    if (this.additionalRideInfo.valid && this.bookRideForm.valid && this.rideDetails.availableSeats != 0 && this.rideDetails.startTime != "") {
      this.initializeRideDetail();
      this.offerRideService.offerRide(this.rideDetails).subscribe((ride) => {
        if (ride.isSuccess)
          this.onSuccessfulOperation(ride.message);
        else
          this.onUnsuccessfulOperation(ride.message);
      });
    }
    else {
      this.onUnsuccessfulOperation("Fill the required fields");
    }
  }


  initializeRideDetail() {
    this.rideDetails.source = (this.getControl('From', 'value')).toLowerCase();
    this.rideDetails.destination = this.getControl('To', 'value').toLowerCase();
    this.rideDetails.journeyOn = this.getControl('Date', 'value');
    this.rideDetails.seats = this.getControl('Seat', 'value');

    if (this.rideMode != "book") {
      this.rideDetails.stops = this.additionalRideInfo.controls['stops'].value.filter((item: string) => item != null && item.trim().length != 0) ?? [];
      this.rideDetails.price = this.price;
    }
  }

  selectedTimeSlot(time: string) {
    this.rideDetails.startTime = this.rideDetails.startTime == time ? "" : time;
  }

  numberToArray(length: number) {
    return Utility.generateArray(length);
  }

  async bookRide(rideDetail: Ride) {
    await this.bookrideService.bookRide(rideDetail).subscribe(obj => {
      this.onSuccessfulOperation("Booking Successful");
    });
  }

  nextCard() {
    if(!this.checkSrcDst())
      this.isNextCard = true;
  }

  availableSeat(seat: number) {
    this.rideDetails.availableSeats = this.rideDetails.availableSeats == seat ? 0 : seat;
  }

  stops(): FormArray {
    return this.additionalRideInfo.get('stops') as FormArray;
  }

  addStop() {
    this.stops().push(new FormControl());
  }

  onSuccessfulOperation(msg: string) {
    this.toastService.show(msg, { classname: 'bg-success text-light', delay: 2000 });
    this.router.navigate(["myrides"]);
  }

  onUnsuccessfulOperation(msg: string) {
    this.responseMsg = msg == "" ? "Some error occured" : msg;
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 2000 });

  }

  toggle(form: any) {
    form.resetForm();
    this.bookRideForm.reset();
    this.bookRideForm.get('Seat')?.setValue(1);
    this.additionalRideInfo.reset();
    if (!this.isOfferCard) {
      this.router.navigate(["../offer"], { relativeTo: this.route });
      this.cardHeading = "Offer a ride";
    }
    else {
      this.router.navigate(["../book"], { relativeTo: this.route })
      this.cardHeading = "Book a ride";
    }

    this.isOfferCard = !this.isOfferCard;
  }

  checkSrcDst() {
    var isSame = this.getControl('From','value').trim().toLowerCase() == this.getControl('To','value').trim().toLowerCase();
    if(isSame)
      this.toastService.show("Source and destination can't be same",{classname:'bg-danger text-light',delay:2000});
    return isSame;
  }
}
