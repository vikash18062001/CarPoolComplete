using System;
using System.Security.Claims;
using AutoMapper;
using CarPool.Concerns;
using CarPool.Contracts.Rides;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CarPool.Providers
{
    public class BookRideService : IBookedRideService
    {
        private readonly CarPoolDbContext _context;
        private readonly IRideService _rideService;
        private readonly UserContext _userContext;
        private readonly IMapper _mapper;
        public BookRideService(CarPoolDbContext context, IRideService rideService,UserContext userContext,IMapper mapper)
        {
            this._rideService = rideService;
            this._context = context;
            this._userContext = userContext;
            this._mapper = mapper;
        }

        public async Task<APIResponse<string>> BookRide(Ride ride)
        {
            User user = this._userContext.GetCurrentUser();
            APIResponse<string> apiResponse = new APIResponse<string>();
            try
            {
                _context.Booking.Add(new Booking
                {
                    CreatedBy = user.ID,
                    OfferID = ride.ID,
                    Source = _rideService.GetLocationId(ride.Source),
                    Destination = _rideService.GetLocationId(ride.Destination),
                    BookedSeat = ride.Seats
                }) ;
                OfferedRide offerride = _context.OfferedRide.Single(obj => obj.ID == ride.ID);
                offerride.AvailableSeats -= ride.Seats;
                await _context.SaveChangesAsync();
                apiResponse = Utility<string>.GetApiResponse("Ride booked successfully", true, "");
            }
            catch (Exception ex)
            {
                apiResponse = Utility<string>.GetApiResponse("Booking is unsuccessfull", false, ex.ToString());
            }

            return apiResponse;
        }

        public APIResponse<List<Ride>> GetBookedRides()
        {
            User user = this._userContext.GetCurrentUser();
            APIResponse<List<Ride>> apiResponse = new APIResponse<List<Ride>>();
            List<Ride> bookedRides = new List<Ride>();
            try
            {
                List<OfferedRide> offeredRides = _context.OfferedRide.Include(obj => obj.Bookings).Where(ob => ob.Bookings.Any(obj => obj.CreatedBy == user.ID)).ToList();
                bookedRides = offeredRides.Select(ride =>
                {
                    Ride rides = this._mapper.Map<Ride>(ride);
                    rides.Source = this._rideService.GetLocationName(ride.Bookings.Select(obj => obj.Source).First());
                    rides.Destination = this._rideService.GetLocationName(ride.Bookings.Select(obj => obj.Destination).First());
                    rides.RideTakenBy = user.ID;
                    rides.RideOfferedBy = ride.CreatedBy;
                    rides.UserEmail = _context.User.Where(obj => obj.ID == ride.CreatedBy).Select(obj => obj.Email).First();
                    return rides;
                }).ToList();
                apiResponse = Utility<List<Ride>>.GetApiResponse("", true, bookedRides);
            }
            catch (Exception ex)
            {
                apiResponse = Utility<List<Ride>>.GetApiResponse(ex.ToString(), false, bookedRides);
            }

            return apiResponse;
        }
    }
}

