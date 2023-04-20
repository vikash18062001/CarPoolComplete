export class Ride {
    rideId !: number;
    userName !: string;
    profileUrl !: string;
    source !: string;
    destination !: string;
    journeyOn !: Date;
    startTime !: string;
    stops !: Array<string>;
    availableSeats !: number;
    price !: number;
    rideOfferedBy !: number;
    rideTakenBy !: number;
    seats !: number;
    userEmail !:string;
}