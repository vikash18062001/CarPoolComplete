using System;
using CarPool.Concerns;

namespace CarPool.Contracts.Rides
{
    public interface IRideService
    {
        public APIResponse<List<Ride>> GetMatchesForRide(Ride ride);

        public int GetLocationId(string name);

        public int AddLocation(string name);

        public void AddStop(string loc, OfferedRide offerRide);

        public string GetLocationName(int id);
    }
}

