using System;
using CarPool.Concerns;

namespace CarPool.Contracts.Rides
{
	public interface IBookedRideService
	{
        public Task<APIResponse<string>> BookRide(Ride ride);

        public APIResponse<List<Ride>> GetBookedRides();

    }
}

