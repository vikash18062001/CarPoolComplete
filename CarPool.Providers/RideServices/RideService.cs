using System;
using System.Security.Claims;
using CarPool.Concerns;
using CarPool.Contracts.Rides;
using Microsoft.EntityFrameworkCore;
using CarPool;
using AutoMapper;

namespace CarPool.Providers
{
    public class RideService : IRideService
    {
        private readonly CarPoolDbContext _context;
        private readonly UserContext _userContext;
        private readonly IMapper _mapper;

        public RideService(CarPoolDbContext context, UserContext userContext,IMapper mapper)
        {
            this._context = context;
            this._userContext = userContext;
            this._mapper = mapper;
        }

        public void AddStop(string loc,OfferedRide offerRide)
        {
            bool x = _context.Location.Any(ob => ob.Name == loc);
            if (!x)
                _context.Location.Add(new Location { Name = loc });
            _context.Stop.Add(new Stop { Name = (loc).ToLower(), RideId = offerRide.ID });
            _context.SaveChanges();
        }

        public int GetLocationId(string name)
        {
            return _context.Location.Where(loc => loc.Name == name).Select(obj => obj.ID).FirstOrDefault();
        }

        public int AddLocation(string locationName)
        {
            try
            {
                Location location = new Location() { Name = locationName };
                _context.Location.Add(location);
                _context.SaveChanges();
                return location.ID;
            }
            catch
            {
                return 0;
            }
        }

        public string GetLocationName(int id)
        {
            return _context.Location.Where(loc => loc.ID == id).Select(loc => loc.Name).First();
        }

        public APIResponse<List<Ride>> GetMatchesForRide(Ride ride)
        {
            User user = this._userContext.GetCurrentUser();
            List<Ride> filterRide = new List<Ride>();
            APIResponse<List<Ride>> apiResponse = new APIResponse<List<Ride>>();
            try
            {
                int sourceId = this.GetLocationId((ride.Source).ToLower());
                int destinationId = this.GetLocationId((ride.Destination).ToLower());
                List<OfferedRide> offeredRides = _context.OfferedRide.Include(ob => ob.Stops).Where(obj => obj.JourneyOn == ride.JourneyOn && obj.StartTime == ride.StartTime && obj.AvailableSeats > 0 && obj.Source != destinationId && obj.CreatedBy != user.ID && obj.AvailableSeats >= ride.Seats).ToList().Where(obj=> (obj.Source == sourceId && obj.Destination == destinationId) ||
                        (obj.Source == sourceId && obj.Stops.Any(ob => ob.Name == (ride.Destination).ToLower())) ||
                        (obj.Stops.Any(ob => ob.Name == (ride.Source).ToLower()) && obj.Stops.Any(ob => ob.Name == (ride.Destination).ToLower()) && (obj.Stops.Where(ob => ob.Name == (ride.Source).ToLower()).Select(ob => ob.ID).First() < (obj.Stops.Where(ob => ob.Name == (ride.Destination).ToLower()).Select(ob => ob.ID).First()))) ||
                        (obj.Destination == destinationId && (obj.Stops.Any(obj => obj.Name == (ride.Source).ToLower())))).ToList();
                filterRide = offeredRides.Select(obj =>
                {
                    Ride rides = this._mapper.Map<Ride>(obj);
                    rides.Source = (ride.Source).ToLower();
                    rides.Destination = ride.Destination.ToLower();
                    rides.RideOfferedBy = obj.CreatedBy;
                    rides.JourneyOn = obj.CreatedOn;
                    rides.ID = obj.ID;
                    rides.Seats = ride.Seats;
                    return rides;
                }).ToList();
                apiResponse = Utility<List<Ride>>.GetApiResponse("", true, filterRide);
            }
            catch(Exception ex)
            {
                apiResponse = Utility<List<Ride>>.GetApiResponse(ex.ToString(), false, filterRide);
            }

            return apiResponse;
        }
    }
}