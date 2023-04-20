import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss']
})
export class UsercardComponent {

  @Input() cardData = new Input();
  @Input() isBookedRide : boolean = false;
  @Output() rideBook = new EventEmitter();
  userName !: string;
  destination !: string;
  source !: string;
  date !: string;
  time !: string;
  price !: number;
  availableSeats: number = 2;
  userProfile : string = "";

  ngOnChanges() {
    this.userName = this.cardData.userName;
    this.userProfile = this.cardData.profileUrl == "" ? "../../../../assets/images/user-profile.png" : this.cardData.profileUrl;
    this.destination = this.cardData.destination;
    this.source = this.cardData.source;
    this.date = this.cardData.journeyOn;
    this.time = this.cardData.startTime;
    this.availableSeats = this.cardData.availableSeats;
    this.price = this.cardData.price;
  }

  onCardClick() {
    this.rideBook.emit(this.cardData);
  }
}
