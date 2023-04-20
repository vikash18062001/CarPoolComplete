using System;
using AutoMapper;
using CarPool.Concerns;
using CarPool.Contracts.Rides;
using Microsoft.EntityFrameworkCore;

namespace CarPool.Providers
{
	public class OfferRideService : IOfferedRideService
    {
        private readonly CarPoolDbContext _context;
        private readonly IRideService _rideService;
        private readonly UserContext _userContext;
        private readonly IMapper _mapper;
        public OfferRideService(CarPoolDbContext context, IRideService rideService,UserContext userContext,IMapper mapper)
        {
            this._rideService = rideService;
            this._context = context;
            this._userContext = userContext;
            this._mapper = mapper;
        }

        public async Task<APIResponse<string>> OfferRide(Ride ride)
        {
            User user = this._userContext.GetCurrentUser();
            APIResponse<string> apiResponse = new APIResponse<string>();
            int id = this._rideService.GetLocationId(ride.Source);
            int sourceId = id == 0 ? this._rideService.AddLocation((ride.Source).ToLower()) : id;

            id = this._rideService.GetLocationId(ride.Destination);
            int destinationId = id == 0 ? this._rideService.AddLocation((ride.Destination).ToLower()) : id;
            try
            {
                OfferedRide offerRide = this._mapper.Map<OfferedRide>(ride);
                offerRide.CreatedBy = user.ID;
                offerRide.Source = sourceId;
                offerRide.Destination = destinationId;
                _context.OfferedRide.Add(offerRide);
                await _context.SaveChangesAsync();
                ride.Stops.ForEach(loc => this._rideService.AddStop(loc, offerRide)); // have to check for the for each method
                await _context.SaveChangesAsync();
                apiResponse = Utility<string>.GetApiResponse("Ride offered Successfully", true, "");
            }
            catch (Exception ex)
            {
                apiResponse = Utility<string>.GetApiResponse("Some error occured", false, ex.ToString());
            }

            return apiResponse;
        }

        public APIResponse<List<Ride>> GetOfferedRides()
        {
            User user = this._userContext.GetCurrentUser();
            APIResponse<List<Ride>> apiResponse = new APIResponse<List<Ride>>();
            List<OfferedRide> offeredRides = new List<OfferedRide>();
            List<Ride> allOfferedRides = new List<Ride>();
            List<Ride> allOfferedRides1 = new List<Ride>();

            try
            {
                offeredRides = _context.OfferedRide
                    .Include(obj => obj.Bookings)
                    .Where(ride => ride.CreatedBy == user.ID && ride.Bookings.Any(obj => obj.OfferID == ride.ID))
                    .ToList();
                allOfferedRides = offeredRides.Select(ride =>
                {
                    Ride rides = this._mapper.Map<Ride>(ride);
                    rides.ID = ride.ID;
                    rides.Source = this._rideService.GetLocationName(ride.Source);
                    rides.Destination = this._rideService.GetLocationName(ride.Destination);
                    rides.RideOfferedBy = user.ID;
                    rides.UserEmail = _context.User.Where(obj => obj.ID == ride.Bookings.Select(obj => obj.CreatedBy).First()).Select(obj => obj.Email).First();
                    return rides;
                }).ToList();
                apiResponse = Utility<List<Ride>>.GetApiResponse("", true, allOfferedRides);
            }
            catch (Exception ex)
            {
                apiResponse = Utility<List<Ride>>.GetApiResponse(ex.ToString(), false, allOfferedRides);
            }

            return apiResponse;
        }
    }
}

